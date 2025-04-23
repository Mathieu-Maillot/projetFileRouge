using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using CarConnectAPI.Data;
using CarConnectAPI.DTOs.Users;
using CarConnectAPI.Helpers;
using CarConnectAPI.Models;
using CarConnectAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using MongoDB.Driver;
using UserMicroService.DTOs.Users;

namespace CarConnectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthentificationController : ControllerBase
    {
        private readonly MongoDbContext _mongoDbContext;
        private readonly AppSettings _appSettings;
        private readonly Encryptor _encryptor;

        public AuthentificationController(MongoDbContext db, IOptions<AppSettings> appSettings)
        {
            _mongoDbContext = db;
            _appSettings = appSettings.Value;
            _encryptor = new Encryptor();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequestDTO registerDto)
        {
            try
            {
                var existingUser = await _mongoDbContext.GetCollection<User>("User")
                                                        .Find(u => u.Email == registerDto.Email)
                                                        .FirstOrDefaultAsync();
                if (existingUser != null)
                {
                    return BadRequest(new UserRegisterResponseDTO { IsSuccessful = false, ErrorMessage = "Invalid Authentication !" });
                }

                string? email = null;
                var userEmailClaim = User.FindFirstValue("Email");
                if (!string.IsNullOrWhiteSpace(userEmailClaim))
                {
                    email = userEmailClaim;
                }

                var user = new User
                {
                    Id = RandomStringGenerator.StringGenerator(),
                    Email = registerDto.Email,
                    Password = _encryptor.EncryptPassword(registerDto.Password!),
                    Firstname = registerDto.Firstname,
                    Lastname = registerDto.LastName,
                    Birthdate = registerDto.BirthDate,
                    PhoneNumber = registerDto.PhoneNumber,
                    Address = registerDto.Address,
                    Role = registerDto.Role,
                    CreatedAt = DateTime.UtcNow,
                };

                if (registerDto.Gender.Equals("F"))
                    user.Gender = ConstantValues.GenreFemale;
                else if (registerDto.Gender.Equals("M"))
                    user.Gender = ConstantValues.GenreMale;
                else
                    user.Gender = ConstantValues.GenreOther;


                await _mongoDbContext.GetCollection<User>("User").InsertOneAsync(user);
                return Ok(new UserRegisterResponseDTO { IsSuccessful = true, User = user , ErrorMessage = "User Add To the database"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new UserRegisterResponseDTO { IsSuccessful = false, ErrorMessage = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDTO loginDto)
        {
            var user = await _mongoDbContext.GetCollection<User>("User")
                                            .Find(u => u.Email == loginDto.Email)
                                            .FirstOrDefaultAsync();
            Console.WriteLine($"the user is : \n{user}");
            if (user is null)
                return BadRequest(new UserLoginResponseDTO { IsSuccess = false, ErrorMessage = "Invalid Authentication !" });

            var (verified, needsgrade) = _encryptor.Check(user.Password!, loginDto.Password!);
            if (!verified)
                return BadRequest(new UserLoginResponseDTO { IsSuccess = false, ErrorMessage = "Invalid Authentication !" });
            if (needsgrade)
            {
                user.Password = _encryptor.EncryptPassword(loginDto.Password!);
                var filter = Builders<User>.Filter.Where(u => u.Email == loginDto.Email);

                var update = Builders<User>.Update.Set(u => u.Password, user.Password);
                await _mongoDbContext.GetCollection<User>("User").UpdateOneAsync(filter, update);
            }

            var role = user.Role == ConstantValues.RoleAdmin ? ConstantValues.RoleAdmin : ConstantValues.RoleUser;


            var claims = new List<Claim>()
            {
                new(ClaimTypes.Role, role),
                new("Email", user.Email!),
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.SecretKey!)),
                SecurityAlgorithms.HmacSha256
             );

            var jwt = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signingCredentials,
                expires: DateTime.Now.AddDays((double) _appSettings.TokenExpirationDays!)
             ); 

            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Ok( new UserLoginResponseDTO
            {
                IsSuccess = true,
                Token = token,
                User = user
            });
        }

        //[HttpGet("validate")]
        //[Authorize]
        //public IActionResult ValidateToken()
        //{
        //    // This action = token validated
        //    return Ok(new { Message = "Token is valid." });
        //}
    }
}

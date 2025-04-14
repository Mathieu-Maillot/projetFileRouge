using System.IdentityModel.Tokens.Jwt;
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

        public AuthentificationController(MongoDbContext db, AppSettings appSettings, Encryptor encryptor)
        {
            _mongoDbContext = db;
            _appSettings = appSettings;
            _encryptor = encryptor;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequestDTO registerDto)
        {
            try
            {
                // user Email verification
                var existingUser = await _mongoDbContext.GetCollection<User>("User")
                                                        .Find(u => u.Email == registerDto.Email)
                                                        .FirstOrDefaultAsync();

                if (existingUser != null)
                    return BadRequest(new UserRegisterResponseDTO { IsSuccessful = false, ErrorMessage = "Invalid Authentication !" });

                // Extract User ID of JWT if user is authenticated
                string? createdBy = null;
                var userClaim = User.FindFirstValue("UserId");
                if (!string.IsNullOrEmpty(userClaim))
                {
                    createdBy = userClaim;
                }

                //create new user
                var user = new User
                {
                    Email = registerDto.Email,
                    Password = _encryptor.EncryptPassword(registerDto.Password!),
                    Role = registerDto.Role,
                    CreatedAt = DateTime.UtcNow,
                    Id = createdBy
                };

                // Ajouter l'utilisateur à MongoDB
                await _mongoDbContext.GetCollection<User>("User").InsertOneAsync(user);
                return Ok(new UserRegisterResponseDTO { IsSuccessful = true, User = user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new UserRegisterResponseDTO { IsSuccessful = false, ErrorMessage = "An error occurred: {ex.Message}" });
            }
           
            //if (registerDto.Role == ConstantValues.RoleAdmin && User.FindFirstValue(ClaimTypes.Role) != ConstantValues.RoleAdmin)
            //{
            //    return Unauthorized(new UserRegisterResponseDTO { IsSuccessful = false, ErrorMessage = "You can't create an administrator as a user" });
            //}

            //if (await _users.Find(u => u.Email == registerDto.Email).FirstOrDefaultAsync() != null)
            //    return BadRequest(new UserRegisterResponseDTO { IsSuccessful = false, ErrorMessage = "Email exist" });

            //// Extract UserId of JWT if usser is authenticated
            ////string createdBy = null;
            ////var userIdClaim = User.FindFirstValue("UserId");
            ////if (!string.IsNullOrEmpty(userIdClaim))
            ////{
            ////    createdBy = userIdClaim;
            ////}

            //// Create a new User
            //var user = new User
            //{
            //    Email = registerDto.Email,
            //    Password = _encryptor.EncryptPassword(registerDto.Password!),
            //    Role = registerDto.Role,
            //    CreatedAt = DateTime.UtcNow,
            //    UpdateAt = DateTime.UtcNow,
            //};
            //await _users.InsertOneAsync(user);

            //var insertedUser = await _users.Find(u => u.Id == user.Id).FirstOrDefaultAsync();
            //if (insertedUser != null)
            //{
            //    return Ok(new UserRegisterResponseDTO { IsSuccessful = true, User = user });
            //}
            //return BadRequest(new UserRegisterResponseDTO { IsSuccessful = false, ErrorMessage = "Probleme to create an User" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDTO loginDto)
        {
            // Find User with email.
            var user = await _mongoDbContext.GetCollection<User>("User")
                                            .Find(u => u.Email == loginDto.Email)
                                            .FirstOrDefaultAsync();

            if (user is null)
                return BadRequest(new UserLoginResponseDTO { IsSuccess = false, ErrorMessage = "Invalid Authentication !" });

            // password verification
            var (verified, needsgrade) = _encryptor.Check(user.Password!, loginDto.Password!);
            if (!verified)
                return BadRequest(new UserLoginResponseDTO { IsSuccess = false, ErrorMessage = "Invalid Authentication !" });

            // Password need upgade
            if (needsgrade)
            {
                user.Password = _encryptor.EncryptPassword(loginDto.Password!);
                var filter = Builders<User>.Filter.Eq(u => u.Id, user.Id);
                var update = Builders<User>.Update.Set(u => u.Password, user.Password);
                await _mongoDbContext.GetCollection<User>("User").UpdateOneAsync(filter, update);
            }

            // Determinate the user role
            var role = user.Role == ConstantValues.RoleAdmin ? ConstantValues.RoleAdmin : ConstantValues.RoleUser;


            // Create Claims to JWT
            var claims = new List<Claim>
            {
                new(ClaimTypes.Role, role),
                new("UserId", user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.SecretKey!)),
                SecurityAlgorithms.HmacSha256
            );

            var jwt = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signingCredentials,
                expires: DateTime.Now.AddDays((double)_appSettings.TokenExpirationDays!));

            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Ok(new UserLoginResponseDTO
            {
                IsSuccess = true,
                Token = token,
                User = user
            });
            //var user = await _users.Find(u => u.Email == loginDto.Email).FirstOrDefaultAsync();
            //if (user == null)
            //    return BadRequest(new UserLoginResponseDTO { IsSuccess = false, ErrorMessage = "Invalid Authentication !" });

            //var (verified, needsUpgrade) = _encryptor.Check(user.Password!, loginDto.Password!);
            //if (!verified)
            //    return BadRequest(new UserLoginResponseDTO { IsSuccess = false, ErrorMessage = "Invalid Authentication !" });
            //if(needsUpgrade)
            //{
            //    user.Password = _encryptor.EncryptPassword(loginDto.Password!);
            //    await _users.InsertOneAsync(user);
            //}

            //var role = user.Role == ConstantValues.RoleAdmin ? ConstantValues.RoleAdmin : ConstantValues.RoleUser;

            //var claims = new List<Claim>
            //{
            //    new (ClaimTypes.Role, role),
            //    new ("UserId", user.Id),
            //};

            //var signingCredentials = new SigningCredentials(
            //    new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.SecretKey!)),
            //    SecurityAlgorithms.HmacSha256
            //);

            //var jwt = new JwtSecurityToken(
            //    claims: claims,
            //    signingCredentials: signingCredentials,
            //    expires: DateTime.Now.AddDays((double)_appSettings.TokenExpirationDays!)
            //);

            //var Token = new JwtSecurityTokenHandler().WriteToken(jwt);

            //return Ok(new UserLoginResponseDTO
            //{
            //    IsSuccess = true,
            //    Token = Token,
            //    User = user,
            //});
        }

        [HttpGet("validate")]
        [Authorize]
        public IActionResult ValidateToken()
        {
            // This action = token validated
            return Ok(new { Message = "Token is valid." });
        }
    }
}

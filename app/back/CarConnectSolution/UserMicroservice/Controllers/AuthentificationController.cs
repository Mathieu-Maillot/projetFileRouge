using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using UserMicroservice.Data;
using UserMicroservice.DTOs.Users;
using UserMicroservice.Helpers;
using UserMicroservice.Models;
using UserMicroservice.Models.Enums;
using System.IdentityModel.Tokens.Jwt;

namespace UserMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthentificationController : ControllerBase
    {
        private readonly MongoDbContext _mongoDbContext;
        private readonly AppSettings _appSettings;
        private readonly Encryptor _encryptor;

        public AuthentificationController(MongoDbContext mongoDbContext, IOptions<AppSettings> appSettings)
        {
            _mongoDbContext = mongoDbContext;
            _appSettings = appSettings.Value;
            _encryptor = new Encryptor();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequestDTO registerDto)
        {
            if (registerDto.Role == RoleStatus.admin && User.FindFirstValue(ClaimTypes.Role) != Constants.RoleAdmin)
                return Unauthorized(new UserRegisterResponseDTO { IsSuccessful = false, ErrorMessage = "You can't create an administrator as a user."});

            var existingUser = _mongoDbContext.UserCollection.Find(u => u.Email == registerDto.Email);
            if (await existingUser.FirstOrDefaultAsync() != null)
                return BadRequest(new UserRegisterResponseDTO { IsSuccessful = false, ErrorMessage = "Email exists" });

            //Extrat UserId from the JWT if the user is authenticated
            ObjectId createdBy = new ObjectId();
            var userIdClaim = User.FindFirstValue("UserId");
            if(!string.IsNullOrEmpty(userIdClaim) && ObjectId.TryParse(userIdClaim, out ObjectId userId))
            {
                createdBy = userId;
            }

            //Create a new user
            var user = new User
            {
                Email = registerDto.Email,
                Password = _encryptor.EncryptPassword(registerDto.Password!),
                Role = registerDto.Role,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = createdBy,
            };

            //Insert User Into MongoDb
            await _mongoDbContext.UserCollection.InsertOneAsync(user);
            return Ok(new UserRegisterResponseDTO { IsSuccessful = true, User = user});
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDTO loginDto)
        {
            var user = await _mongoDbContext.UserCollection
                                            .Find(u => u.Email == loginDto.Email)
                                            .FirstOrDefaultAsync();

            if (user == null) 
                return BadRequest(new UserLoginResponseDTO { IsSuccessful = false, ErrorMessage= "Invalid Authentification !" });

            var (verified, needsUpgrade) = _encryptor.Check(user.Password!, loginDto.Password!);

            if (!verified)
                return BadRequest(new UserLoginResponseDTO { IsSuccessful = false, ErrorMessage = "Invalid Authentification !" });
            
            if (needsUpgrade)
            {
                user.Password = _encryptor.EncryptPassword(loginDto.Password!);
                await _mongoDbContext.UserCollection.UpdateOneAsync(u => u.Id == user.Id, user.Password);
            }

            var role = user.Role == RoleStatus.admin ? Constants.RoleAdmin : Constants.RoleUser;

            var claims = new List<Claim>
            {
                new (ClaimTypes.Role, role),
                new ("userId",user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.SecretKey!)),
                SecurityAlgorithms.HmacSha256
            );

            var jwt = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signingCredentials,
                expires: DateTime.Now.AddDays((double)_appSettings.TokenExpirationDays!)
                
            );

            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Ok(new UserLoginResponseDTO
            {
                IsSuccessful = true,
                Token = token,
                User = user,
            });
        }

        [HttpGet("validate")]
        [Authorize]
        public IActionResult ValideToken()
        {
            // If this action is reached, the token is valid
            return Ok(new { Message = "Token is valid?" });
        }

        //[HttpGet("validate")]
        //[Authorize]
        //public IActionResult ValidateToken()
        //{
        //    // If this action is reached, the token is valid
        //    return Ok(new { Message = "Token is valid." });
        //}
    }
}


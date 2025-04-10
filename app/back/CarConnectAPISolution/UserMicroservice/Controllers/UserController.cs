using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using UserMicroService.Models;
using UserMicroService.Services.Interfaces;

namespace UserMicroService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService<User, ObjectId> _userService;

        public UserController(IUserService<User, ObjectId> userService)
        {
            _userService = userService;
        }


        //Get: api/user
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllUserAsync();
            return Ok(users);
        }

        //Get: api/user/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(ObjectId id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        //Post: api/user/{id}
        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            await _userService.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        //Put: api/user/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(ObjectId id, User user)
        {
            if (id != user.Id) return BadRequest();
            var updatedUser = await _userService.UpdateUserAsync(user);
            if (updatedUser == null) return NotFound();
            return NoContent();
        }

        //Delete: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(User user)
        {
            var deleted = await _userService.DeleteUserAsync(user);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}

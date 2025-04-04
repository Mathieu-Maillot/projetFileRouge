using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using UserMicroservice.Models;
using UserMicroservice.Services.Interfaces;

namespace UserMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService<User, ObjectId> _userService;

        public UserController(IUserService<User,ObjectId> userService)
        {
            _userService = userService;
        }

        //Get api/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        //Get: api/user/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(ObjectId id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        //Post: api/user
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            await _userService.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        //Put: api/user/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(ObjectId id, User user)
        {
            if(id != user.Id) return BadRequest();
            var upgratedUser = await _userService.UpdateUserAsync(user);
            if(upgratedUser == null) return NotFound();
            return NoContent();
        }

        //Delete: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(ObjectId id)
        {
            var deleted = await _userService.DeleteUserAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }



        //Vehicle Methods
        //Post: api/{userId}/vehicle
        [HttpPost("{userId}/vehicle")]
        public async Task<IActionResult> CreateVehicleForUser(ObjectId userId, [FromBody]Vehicle vehicle)
        {
            await _userService.CreateVehicleForUserAsync(userId, vehicle);
            return Ok();
        }

        //Get: api/{userId}/vehicles
        [HttpGet("{UserId}/vehicles")]
        public async Task<IActionResult> GetVehiclesForUser(ObjectId userId)
        {
            var vehicles = await _userService.GetVehiclesForUserAsync(userId);
            return Ok(vehicles);
        }

        //Delete: api/{userId}/vehicle/{vehicleId}
        [HttpDelete("{userId}/vehicle/{vehicleId}")]
        public async Task<IActionResult> DeleteVehiculeForUser(ObjectId userId, ObjectId vehicleId)
        {
            await _userService.DeleteVehicleForUserAsync(userId, vehicleId);
            return NoContent();
        }



        //Review Methods
        //Post: api/{userId}/review
        [HttpPost("{userId}/review")]
        public async Task<IActionResult> CreateReviewForUser(ObjectId userId, [FromBody]Review review)
        {
            await _userService.CreateReviewForUserAsync(userId, review);
            return Ok();
        }

        //Get: api/{userId}/reviews
        [HttpGet("{userId}/reviews")]
        public async Task<IActionResult> GetReviewsForUser(ObjectId userId)
        {
            var reviews = _userService.GetReviewForUserAsync(userId);
            return Ok(reviews);
        }

        //Delete: api/{userId}/review/{reviewId}
        [HttpDelete("{userId}/review/{reviewId}")]
        public async Task<IActionResult> DeleteReviewForUser(ObjectId userId, ObjectId reviewId)
        {
            await _userService.DeleteReviewForUserAsync(userId, reviewId);
            return NoContent();
        }
    }
}

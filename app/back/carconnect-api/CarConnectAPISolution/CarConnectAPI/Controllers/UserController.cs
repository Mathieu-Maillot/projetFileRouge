using System.Net;
using System.Reflection.Metadata;
using CarConnectAPI.DTOs;
using CarConnectAPI.Helpers;
using CarConnectAPI.Models;
using CarConnectAPI.Services;
using CarConnectAPI.Services.Interfaces;
using DnsClient;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CarConnectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService<User, string> _userService;

        public UserController(IUserService<User, string> userService)
        {
            _userService = userService;
        }


        //---------
        //User part
        //---------

        //Get: api/user
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllUserAsync();
            return Ok(users);
        }

        //Get: api/user/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        //Post: api/user
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDTO userdto)
        {
            if (userdto == null || string.IsNullOrWhiteSpace(userdto.Firstname) || string.IsNullOrWhiteSpace(userdto.Lastname))
                return BadRequest();
            var user = new User
            {
                Id = RandomStringGenerator.StringGenerator(),
                Role = userdto.Role ?? ConstantValues.RoleUser,
                Gender = userdto.Gender ?? ConstantValues.GenreOther,
                Firstname = userdto.Firstname,
                Lastname = userdto.Lastname,
                Email = userdto.Email,
                Password = userdto.Password,
                Birthdate = userdto.Birthdate,
                Address = userdto.Address,
                CreatedAt = DateTime.UtcNow,
                UpdateAt = DateTime.UtcNow,
                Vehicles = [],
                Reviews = []
            };
            await _userService.CreateUserAsync(user);
            var userDtoResponse = UserDTO.FromEntity(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDtoResponse);
        }

        //Put: api/user/{id}
        [HttpPut("{userid}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody] UserDTO userDto)
        {
            var existingUser = await _userService.GetUserByIdAsync(userId);
            
            if (existingUser == null) 
                return NotFound($"User with Id : {userId} not found");

            if (!string.IsNullOrWhiteSpace(userDto.Firstname)) existingUser.Firstname = userDto.Firstname;
            if (!string.IsNullOrWhiteSpace(userDto.Lastname)) existingUser.Lastname = userDto.Lastname;
            if (!string.IsNullOrWhiteSpace(userDto.Email)) existingUser.Email = userDto.Email;
            if (!string.IsNullOrWhiteSpace(userDto.Address)) existingUser.Address = userDto.Address;
            if (userDto.Birthdate != DateOnly.MinValue)
            {
                existingUser.Birthdate = userDto.Birthdate;
                existingUser.Age = AgeCalculator.AgeCalculatorUser(userDto.Birthdate);
            }
            if (!string.IsNullOrEmpty(userDto.Gender)) existingUser.Gender = userDto.Gender;
            existingUser.UpdateAt = DateTime.UtcNow;

            var success = await _userService.UpdateUserAsync(existingUser);
            if (success is null) return StatusCode(500, "A problem occurred while updating the user.");

            var UpdateDto = UserDTO.FromEntity(existingUser);
            return Ok(UpdateDto);
        }

        //Delete: api/user/{id}
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            var deleted = await _userService.DeleteUserAsync(userId);
            if (!deleted) return NotFound();
            return NoContent();
        }


        //-------------
        // Vehicle Part
        //-------------

        [HttpPost("{userId}/Vehicule/")]
        [ActionName(nameof(UpdateUser))]

        public async Task<IActionResult> CreateVehicleForUserAsync(string userId, [FromBody] VehicleDTO vehicleDto)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user is null) return NotFound();
            if (vehicleDto == null) return BadRequest("Vehicle Values is required !");
            var vehicle = new Vehicle
            {
                Id = RandomStringGenerator.StringGenerator(),
                Brand = vehicleDto.Brand,
                Model = vehicleDto.Model,
                Capacity = vehicleDto.Capacity,
                CreatedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
            };

            user.Vehicles.Add(vehicle);
            var success = await _userService.UpdateUserAsync(user);
            if (success is null) return StatusCode(500, "A problem occurred while updating the user.");
            var userDto = UserDTO.FromEntity(user);
            return Created($"Vehicles/{vehicle.Id}", userDto);
        }

        [HttpGet("{userId}/{vehicleId}")]
        public async Task<IActionResult> GetVehicleByUserIdAsync(string userId, string vehicleId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user is null) return NotFound();
            if (user.Vehicles.Count == 0) return NotFound();
            var vehicle = user.Vehicles.FirstOrDefault(v => v.Id == vehicleId);
            return vehicle == null ? NotFound() : Ok(vehicle);
        }

        [HttpPut("{userId}/Vehicule/{vehicleId}")]
        public async Task<IActionResult> UpdateVehicleAsync(string userId, string vehicleId, [FromBody] Vehicle newVehicle)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user is null) return NotFound();
            if (user.Vehicles.Count == 0) return NotFound();
            var vehicle = user.Vehicles.FirstOrDefault(v => v.Id == vehicleId);
            if (vehicle == null) return NotFound();

            vehicle.Brand = newVehicle.Brand;
            vehicle.Model = newVehicle.Model;
            vehicle.Capacity = newVehicle.Capacity;
            vehicle.LastUpdatedAt = DateTime.UtcNow;

            user.Vehicles.Add(vehicle);
            var success = await _userService.UpdateUserAsync(user);
            if (success is null) return StatusCode(500, "A problem occurred while updating the user.");
            return Ok(success);
        }

        [HttpDelete("{userId}/Vehicule/{vehicleId}")]
        public async Task<IActionResult> DeleteVehicleAsync(string userId, string vehicleId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user is null) return NotFound();
            if (user.Vehicles.Count == 0) return NotFound();
            var vehicle = user.Vehicles.FirstOrDefault(v => v.Id == vehicleId);
            if (vehicle == null) return NotFound();

            user.Vehicles.Remove(vehicle);
            var success = await _userService.UpdateUserAsync(user);
            if (success is null) return StatusCode(500, "A problem occurred while updating the user.");
            return Ok(success);
        }


        //-----------
        //Review part
        //-----------

        [HttpPost("{userId}/Review/")]
        [ActionName(nameof(UpdateUser))]
        public async Task<IActionResult> CreateReviewByUserId(string userId, [FromBody] Review newReview)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user is null) return NotFound();
            var review = new Review
            {
                Id = RandomStringGenerator.StringGenerator(),
                UserId = newReview.UserId,
                Rating = newReview.Rating,
                Comment = newReview.Comment,
                CreatedAt = newReview.CreatedAt,
                LastUpdatedAt = newReview.LastUpdatedAt,
            };

            user.Reviews.Add(review);
            var success = await _userService.UpdateUserAsync(user);
            if (success is null) return StatusCode(500, "A problem occurred while updating the user.");
            var reviewDto = ReviewDTO.FromEntity(review);
            return Created($"Reviews/{review.Id}", reviewDto);
        }


        [HttpGet("{userId}/Review/{reviewId}")]
        public async Task<IActionResult> GetReviewByUserIdAsync(string userId, string reviewId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if(user is null) return NotFound();
            if(user.Reviews.Count == 0) return NotFound();
            var review = user.Reviews.FirstOrDefault(r => r.Id == reviewId);
            if (review is null) return NotFound();
            return Ok(review);
        }


        [HttpPut("{userId}/Review/{reviewId}")]
        public async Task<IActionResult> UpdateReviewAsync(string userId, string reviewId, [FromBody] Review newReview)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if(user is null) return NotFound();
            if(user.Reviews.Count == 0) return NotFound();
            var review = user.Reviews.FirstOrDefault(r => r.Id == reviewId);
            if (review is null) return NotFound();

            review.UserId = newReview.UserId;
            review.Rating = newReview.Rating;
            review.Comment = newReview.Comment;
            review.LastUpdatedAt = DateTime.UtcNow;

            var success = await _userService.UpdateUserAsync(user);
            if (success is null) return StatusCode(500, "A problem occurred while updating the user.");
            return Ok(success);
        }


        [HttpDelete("{userId}/Review/{reviewId}")]
        public async Task<IActionResult> DeleteReviewAsync(string userId, string reviewId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if(user is null) return NotFound();
            if(user.Reviews.Count == 0) return NotFound();
            var review = user.Reviews.FirstOrDefault(v => v.Id == reviewId);
            if (review is null) return NotFound();
            user.Reviews.Remove(review);
            var success = await _userService.UpdateUserAsync(user);
            if(success is null) return StatusCode(500, "A problem occurred while updating the user.");
            return Ok(success);
        }
    }
}

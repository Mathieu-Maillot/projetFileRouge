using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using UserMicroservice.DTOs;
using UserMicroservice.Services.Interfaces;
using UserMicroService.Models;

namespace UserMicroservice.Controllers
{
    [Route("api/Users/{userId}/vehicles")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService<Vehicle, ObjectId> _vehicleService;

        public VehicleController(IVehicleService<Vehicle, ObjectId> vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicleForUser(ObjectId userId, [FromBody] VehicleDTO vehicleDto)
        {
            if (vehicleDto == null) return BadRequest("Vehicle Data is required.");
            try
            {
                var vehicule = new Vehicle
                {
                    Id = ObjectId.GenerateNewId(),
                    Brand = vehicleDto.Brand,
                    Model = vehicleDto.Model,
                    Capacity = vehicleDto.Capacity,
                    CreatedAt = DateTime.UtcNow,
                    LastUpdatedAt = DateTime.UtcNow,
                };

                await _vehicleService.CreateVehicleAsync(userId, vehicule);
                return CreatedAtAction(nameof(GetVehicleByUserIdAsync), new { Id = userId, vehicleId = vehicleDto.Id }, vehicleDto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest($"Error creating vehicle: {ex.Message}");
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
            
        }


        [HttpGet("{vehicleId}")]
        public async Task<IActionResult> GetVehicleByUserIdAsync(ObjectId userId, ObjectId vehicleId)
        {
            try
            {
                var vehicle = await _vehicleService.GetVehicleByUserIdAsync(userId, vehicleId);
                return Ok(vehicle);
            }
            catch (ArgumentException ex)
            {
                return NotFound($"Error retrieving vehicle: {ex.Message}");
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetVehiclesByUserIdAsync(ObjectId userId)
        {
            try
            {
                var vehicles = await _vehicleService.GetVehiclesByUserIdAsync(userId);
                return Ok(vehicles);
            }
            catch (ArgumentException ex)
            {
                return NotFound($"Error retrieving vehicles: {ex.Message}");
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut("{vehicleId}")]
        public async Task<IActionResult> UpdateVehicleAsync(ObjectId userId, ObjectId vehicleId, [FromBody] VehicleDTO vehicleDto)
        {
            if (vehicleDto == null)
            {
                return BadRequest("Vehicle data is required.");
            }

            try
            {
                var vehicle = new Vehicle
                {
                    Id = vehicleId,
                    Brand = vehicleDto.Brand,
                    Model = vehicleDto.Model,
                    Capacity = vehicleDto.Capacity,
                    LastUpdatedAt = vehicleDto.LastUpdatedAt
                };

                await _vehicleService.UpdateVehicleAsync(userId, vehicle);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound($"Error updating vehicle: {ex.Message}");
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpDelete("{vehicleId}")]
        public async Task<IActionResult> DeleteVehicleAsync(ObjectId userId, ObjectId vehicleId)
        {
            try
            {
                await _vehicleService.DeleteVehicleAsync(userId, vehicleId);
                return NoContent();  // Status HTTP 204 : No Content
            }
            catch (ArgumentException ex)
            {
                return NotFound($"Error deleting vehicle: {ex.Message}");
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

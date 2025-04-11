using CarConnectAPI.DTOs;
using CarConnectAPI.Models;
using CarConnectAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CarConnectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RideController : ControllerBase
    {
        private readonly IRideService<Ride, string> _rideService;

        public RideController(IRideService<Ride, string> rideService)
        {
            _rideService = rideService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRide()
        {
            var rides = await _rideService.GetAllRidesAsync();
            var rideDTOs = rides.Select(ride => new RideDTO
            {
                Id = ride.Id,
                DepartureLocation = ride.DepartureLocation,
                ArrivalLocation = ride.ArrivalLocation,
                DepartureTime = ride.DepartureTime,
                ArrivalTime = ride.ArrivalTime,
                AvailableSeats = ride.AvailableSeats,
                Price = ride.Price,
                Description = ride.Description,
                NoSmoking = ride.NoSmoking,
                PetsAllowed = ride.PetsAllowed
            });

            return Ok(rideDTOs);
        }

        [HttpGet("{rideId}")]
        public async Task<IActionResult> GetRideById(string rideId)
        {
            var ride = await _rideService.GetRideByIdAsyn(rideId);
            if (ride == null)
            {
                return NotFound();
            }

            var rideDTO = new RideDTO
            {
                Id = ride.Id,
                DepartureLocation = ride.DepartureLocation,
                ArrivalLocation = ride.ArrivalLocation,
                DepartureTime = ride.DepartureTime,
                ArrivalTime = ride.ArrivalTime,
                AvailableSeats = ride.AvailableSeats,
                Price = ride.Price,
                Description = ride.Description,
                NoSmoking = ride.NoSmoking,
                PetsAllowed = ride.PetsAllowed,
                Passengers = ride.Passengers,
            };

            return Ok(rideDTO);
        }

        [HttpPost]
        [ActionName(nameof(GetRideById))]
        public async Task<IActionResult> CreateRideAsync([FromBody] Ride ride)
        {
            if (ride is null) return BadRequest("Invalid ride Data");

            var createdRide = await _rideService.CreateRideAsync(ride);
            var dto = RideDTO.FromEntity(createdRide);
            return Created($"Ride/{createdRide.Id}", dto);
        }

        [HttpPut("{rideId}")]
        public async Task<IActionResult> UpdateRideAsync(string rideId, [FromBody] RideDTO rideDtoUp)
        {
            var ride = await _rideService.GetRideByIdAsyn(rideId);
            if (ride == null) return NotFound();

            ride.DepartureLocation = rideDtoUp.DepartureLocation!;
            ride.ArrivalLocation = rideDtoUp.ArrivalLocation!;
            ride.DepartureTime = rideDtoUp.DepartureTime;
            ride.ArrivalTime = rideDtoUp.ArrivalTime;
            ride.AvailableSeats = rideDtoUp.AvailableSeats;
            ride.Price = rideDtoUp.Price;
            ride.Description = rideDtoUp.Description;
            ride.NoSmoking = rideDtoUp.NoSmoking;
            ride.PetsAllowed = rideDtoUp.PetsAllowed;
            ride.UpdateAt = DateTime.UtcNow;

            var success = await _rideService.UpdateRideAsync(rideId, ride);

            if (!success) return StatusCode(500, "A problem occurred while updating the ride.");
            return NoContent();
        }

        [HttpDelete("{rideId}")]
        public async Task<IActionResult> DeleteRideAsync(string rideId)
        {
            var DeletedRide = await _rideService.GetRideByIdAsyn(rideId);
            if (DeletedRide == null)return NotFound();

            var success = await _rideService.DeleteRideAsync(rideId);

            if (!success) return StatusCode(500, "A problem occurred while deleting the ride.");
            return NoContent();
        }


        [HttpGet("search")]
        public async Task<IActionResult> SearchRides([FromQuery] string departure, [FromQuery] string arrival, [FromQuery] DateTime? date)
        {
            var rides = await _rideService.SearchRidesAsync(departure, arrival, date);

            if (!rides.Any())return NotFound("No rides found matching the search criteria.");

            var rideDTOs = rides.Select(ride => new RideDTO
            {
                Id = ride.Id,
                DepartureLocation = ride.DepartureLocation,
                ArrivalLocation = ride.ArrivalLocation,
                DepartureTime = ride.DepartureTime,
                ArrivalTime = ride.ArrivalTime,
                AvailableSeats = ride.AvailableSeats,
                Price = ride.Price,
                Description = ride.Description,
                NoSmoking = ride.NoSmoking,
                PetsAllowed = ride.PetsAllowed
            }).ToList();

            return Ok(rideDTOs);
        }
    }
}

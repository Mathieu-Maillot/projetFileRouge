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
    public class BookingController : ControllerBase
    {
        private readonly IBookingService<Booking, string> _bookingService;

        public BookingController(IBookingService<Booking, string> bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBookingAsync()
        {
            var bookings = await _bookingService.GetAllBookingsAsync();
            var bookingDTO = bookings.Select(booking => new BookingDTO{
                Id = booking.Id,
                RideId = booking.RideId,
                UserId = booking.UserId,
                BookingTime = booking.BookingTime,
                Status = booking.Status,
                CreatedAt = booking.CreatedAt,
                UpdatedAt = booking.UpdatedAt,
            });

            return Ok(bookingDTO);
        }

        [HttpGet("{bookingId}")]
        public async Task<IActionResult> GetBookingByIdAsync(string bookingId)
        {
            var booking = await _bookingService.GetBookingByIdAsync(bookingId);
            if (booking is null) return NotFound();
            return Ok(BookingDTO.FromEntity(booking));
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetBookingByUserIdAsync(string userId)
        {
            var bookings = await _bookingService.GetBookingsByUserIdAsync(userId);
            return Ok(bookings.Select(BookingDTO.FromEntity));
        }

        [HttpGet("{rideId}")]
        public async Task<IActionResult> GetBookingByRideIdAsync(string rideId)
        {
            var bookings = await _bookingService.GetBookingsByRideIdAsync(rideId);
            return Ok(bookings.Select(BookingDTO.FromEntity));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBookingAsync([FromBody] Booking booking)
        {
            var created = await _bookingService.CreateBookingAsync(booking);
            return CreatedAtAction(nameof(GetBookingByIdAsync), new { id = created.Id }, booking);
        }

        [HttpPut("{bookingId}")]
        public async Task<IActionResult> UpdateBookingAsync(string bookingId, [FromBody] Booking booking)
        {
            var result = await _bookingService.UpdateBookingAsync(bookingId, booking);
            return result ? NoContent() : NotFound();
        }

        [HttpDelete("{bookingId}")]
        public async Task<IActionResult> DeleteBookingAsync(string bookingId)
        {
            var result = await _bookingService.DeleteBookingAsync(bookingId);
            return result ? NoContent(): NotFound();
        }
    }
}

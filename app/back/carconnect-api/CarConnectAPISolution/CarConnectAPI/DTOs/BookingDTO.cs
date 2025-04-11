using CarConnectAPI.Models;

namespace CarConnectAPI.DTOs
{
    public class BookingDTO
    {
        public string? Id { get; set; }
        public string? RideId { get; set; }
        public string? UserId { get; set; }
        public DateTime BookingTime { get; set; }
        public string? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public static BookingDTO FromEntity(Booking booking)
        {
            return new BookingDTO
            {
                Id = booking.Id,
                RideId = booking.RideId,
                UserId = booking.UserId,
                BookingTime = booking.BookingTime,
                Status = booking.Status,
                CreatedAt = booking.CreatedAt,
                UpdatedAt = booking.UpdatedAt
            };
        }
    }
}

using CarConnectAPI.Models.Enums;

namespace CarConnectAPI.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int RideId { get; set; }
        public int UserId { get; set; }
        public DateTime BookingTime { get; set; }
        public Status Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

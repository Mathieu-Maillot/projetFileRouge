using CarConnectAPI.Helpers;

namespace CarConnectAPI.Models
{
    public class Booking
    {
        public string Id { get; set; } = RandomStringGenerator.StringGenerator(12);
        public string RideId { get; set; }
        public string UserId { get; set; }
        public DateTime BookingTime { get; set; }
        public string Status { get; set; } = ConstantValues.BookingPending;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set;} = DateTime.UtcNow;
    }
}

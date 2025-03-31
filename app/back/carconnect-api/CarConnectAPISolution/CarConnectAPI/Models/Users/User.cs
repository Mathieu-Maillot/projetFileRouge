using System.ComponentModel.DataAnnotations;
using System.Security.Principal;

namespace CarConnectAPI.Models.Users
{
    public class User : UserBase
    {
        [Required]
        public string? Firstname { get; set; }
        [Required] 
        public string? Lastname { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        public bool IsDriver { get; set; }
        public bool IsPassenger { get; set; }
        public Vehicle Vehicle { get; set; } = new();
        public Account Account { get; set; } = new();
        public List<Review> Reviews { get; set; } = [];
        public List<Message> Messages { get; set; } = [];
        public List<Booking> Bookings { get; set; } = [];
    }
}

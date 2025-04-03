using System.ComponentModel.DataAnnotations;
using System.Security.Principal;
using CarConnectAPI.Models.Enums;

namespace CarConnectAPI.Models.Users
{
    public class User : UserBase
    {
        [Required]
        public string? FirstName { get; set; }
        [Required] 
        public string? LastName { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }

        public DateTime BirthDate { get; set; } 
        public Gender Gender   {  get; set; }

        public int? Age { get; set; } 
        public string? Role { get; set; } = "user";

        public Vehicle Vehicle { get; set; } = new();
        public List<Review> Reviews { get; set; } = [];

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}

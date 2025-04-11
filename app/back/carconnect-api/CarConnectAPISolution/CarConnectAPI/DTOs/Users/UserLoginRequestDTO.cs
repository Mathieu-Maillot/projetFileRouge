using System.ComponentModel.DataAnnotations;

namespace CarConnectAPI.DTOs.Users
{
    public class UserLoginRequestDTO
    {
        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}

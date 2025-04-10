using System.ComponentModel.DataAnnotations;

namespace UserMicroService.DTOs.Users
{
    public class UserLoginRequestDTO
    {
        [Required]
        public string? Emal { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}

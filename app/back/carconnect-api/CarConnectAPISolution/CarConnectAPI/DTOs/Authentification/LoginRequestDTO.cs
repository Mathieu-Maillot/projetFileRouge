using System.ComponentModel.DataAnnotations;

namespace CarConnectAPI.DTOs.Authentification
{
    public class LoginRequestDTO
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}

using CarConnectAPI.Models;

namespace CarConnectAPI.DTOs.Users
{
    public class UserLoginResponseDTO
    {
        public bool IsSuccess { get; set; }
        public string? ErrorMessage { get; set; }
        public User? User { get; set; }
        public string? Token { get; set; }
    }
}

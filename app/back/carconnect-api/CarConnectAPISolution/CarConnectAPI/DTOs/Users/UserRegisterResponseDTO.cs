using CarConnectAPI.Models;

namespace CarConnectAPI.DTOs.Users
{
    public class UserRegisterResponseDTO
    {
        public bool IsSuccessful { get; set; }
        public string? ErrorMessage { get; set; }
        public User? User { get; set; }
    }
}

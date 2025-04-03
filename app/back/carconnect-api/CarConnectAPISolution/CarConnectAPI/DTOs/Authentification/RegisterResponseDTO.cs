using CarConnectAPI.Models.Users;

namespace CarConnectAPI.DTOs.Authentification
{
    public class RegisterResponseDTO
    {
        public bool IsSuccessful { get; set; }
        public string? ErrorMessage { get; set; }
        public User? User { get; set; }
    }
}

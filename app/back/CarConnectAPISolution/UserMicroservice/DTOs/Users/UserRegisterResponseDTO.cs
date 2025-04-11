using UserMicroService.Models;

namespace UserMicroService.DTOs.Users
{
    public class UserRegisterResponseDTO
    {
        public bool Successful { get; set; }
        public string? ErrorMessage { get; set; }
        public User? User { get; set; }
    }
}

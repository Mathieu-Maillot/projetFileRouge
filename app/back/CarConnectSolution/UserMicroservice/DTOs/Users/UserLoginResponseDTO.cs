using UserMicroservice.Models;

namespace UserMicroservice.DTOs.Users
{
    public class UserLoginResponseDTO
    {
        public bool IsSuccessful { get; set; }
        public string? ErrorMessage { get; set; }
        public User? User { get; set; }
        public string? Token { get; set; }
    }
}

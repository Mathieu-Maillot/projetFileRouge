using UserMicroService.Models;

namespace UserMicroService.DTOs.Users
{
    public class UserLoginResponseDTO
    {
        public bool IsSuccess { get; set; }
        public string? ErrorMessage { get; set; }
        public User? user { get; set; }
        public string? Token { get; set; }
    }
}

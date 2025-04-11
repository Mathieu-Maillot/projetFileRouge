using System.Text.Json.Serialization;
using CarConnectAPI.Models;

namespace CarConnectAPI.DTOs
{
    public class UserDTO
    {
        [JsonIgnore]
        public string? Firstname { get; set; }

        [JsonIgnore]
        public string? Lastname { get; set; }
        public string Fullname => $"{Firstname} {Lastname}";
        public string? Email { get; set; }
        public char? Gender { get; set; }
        public int Age { get; set; }
        public string? Address { get; set; }
        public DateTime? UpdateAt { get; set; }
        public List<Vehicle> Vehicles { get; set; } = [];
        public List<Review> Reviews { get; set; } = [];

        public static UserDTO FromEntity(User user)
        {
            return new UserDTO
            {
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email,
                Age = user.Age,
                Address = user.Address,
                UpdateAt = user.UpdateAt,
                Vehicles = user.Vehicles,
                Reviews = user.Reviews,
            };
        }
    }
}

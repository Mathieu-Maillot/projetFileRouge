using MongoDB.Bson;

namespace UserMicroservice.Models
{
    public class User
    {
        public ObjectId Id { get; set; }
        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string FullName => $"{Firstname} + {Lastname}";
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int Age { get; set; }
        public RoleStatus Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<Vehicle> VehicleUser { get; set; } = [];
        public List<Review> Reviews { get; set; } = [];
    }
}

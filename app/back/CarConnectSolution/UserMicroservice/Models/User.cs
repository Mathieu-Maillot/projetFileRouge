using MongoDB.Bson;
using UserMicroservice.Models.Enums;

namespace UserMicroservice.Models
{
    public class User
    {
        public ObjectId Id { get; set; }
        public ObjectId CreatedBy { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string FullName => $"{Firstname} + {Lastname}";
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateOnly Birthdate { get; set; }
        public Gender Gender {  get; set; }
        public int Age { get; set; }
        public string? Address { get; set; }
        public RoleStatus Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<Vehicle> VehicleUser { get; set; } = [];
        public List<Review> Reviews { get; set; } = [];
    }
}

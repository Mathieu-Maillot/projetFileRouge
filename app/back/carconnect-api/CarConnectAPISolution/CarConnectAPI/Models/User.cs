using MongoDB.Bson;

namespace CarConnectAPI.Models
{
    public class User
    {
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        public ObjectId CreatedBy { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string Fullname => $"{Firstname} {Lastname}";
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateOnly Birthdate { get; set; }
        public char? Gender { get; set; }
        public int Age { get; set; }
        public string? Address { get; set; }
        public string? Role { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public List<Vehicle> Vehicles { get; set; } = [];
        public List<Review> Reviews { get; set; } = [];
    }
}

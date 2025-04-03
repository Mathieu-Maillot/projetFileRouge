using MongoDB.Bson;

namespace UserMicroservice.Models
{
    public class Vehicle
    {
        public ObjectId Id { get; set; }
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

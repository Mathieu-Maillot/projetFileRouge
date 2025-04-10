using MongoDB.Bson;

namespace UserMicroService.Models
{
    public class Vehicle
    {
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public int Capacity { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

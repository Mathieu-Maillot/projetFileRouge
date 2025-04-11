using CarConnectAPI.Helpers;
using MongoDB.Bson;

namespace CarConnectAPI.Models
{
    public class Vehicle
    {
        public string Id { get; set; } = RandomStringGenerator.StringGenerator(12);
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public int Capacity { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

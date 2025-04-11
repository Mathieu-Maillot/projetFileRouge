using MongoDB.Bson;

namespace CarConnectAPI.DTOs
{
    public class VehicleDTO
    {
        public string Id { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public int Capacity { get; set; }
        public DateTime LastUpdatedAt { get; set; }
    }
}

using MongoDB.Bson;

namespace UserMicroservice.DTOs
{
    public class VehicleDTO
    {
        public ObjectId Id { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public int Capacity { get; set; }
        public DateTime LastUpdatedAt { get; set; }
    }
}

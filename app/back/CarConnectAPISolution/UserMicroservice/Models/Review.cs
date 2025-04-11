using MongoDB.Bson;

namespace UserMicroService.Models
{
    public class Review
    {
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        public ObjectId UserId { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

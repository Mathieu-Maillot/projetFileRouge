using System.Security.Cryptography;
using CarConnectAPI.Helpers;
using MongoDB.Bson;

namespace CarConnectAPI.Models
{
    public class Review
    {
        public string Id { get; set; } = RandomStringGenerator.StringGenerator(12);
        public string? UserId { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

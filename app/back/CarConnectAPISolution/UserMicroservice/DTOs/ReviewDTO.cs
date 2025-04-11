using MongoDB.Bson;

namespace UserMicroservice.DTOs
{
    public class ReviewDTO
    {
        public int Rating { get; set; }
        public string? Comment { get; set; }
    }
}

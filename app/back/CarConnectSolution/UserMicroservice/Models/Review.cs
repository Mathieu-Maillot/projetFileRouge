using MongoDB.Bson;

namespace UserMicroservice.Models
{
    public class Review
    {
        public ObjectId Id { get; set; }
        public ObjectId UserId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime CreateAd {  get; set; }
        public DateTime UpdateAd { get; set; }
    }
}

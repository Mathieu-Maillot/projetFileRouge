using CarConnectAPI.Models;

namespace CarConnectAPI.DTOs
{
    public class ReviewDTO
    {
        public int Rating { get; set; }
        public string? Comment { get; set; }

        public static ReviewDTO FromEntity(Review review)
        {
            return new ReviewDTO
            {
                Rating = review.Rating,
                Comment = review.Comment,
            };
        }
    }
}

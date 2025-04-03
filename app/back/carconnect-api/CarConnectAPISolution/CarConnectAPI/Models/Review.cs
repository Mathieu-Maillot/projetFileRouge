namespace CarConnectAPI.Models
{
    public class Review
    {

    public int? Mark { get; set; }
        public string? Comment { get; set; }
        public int? RideId { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

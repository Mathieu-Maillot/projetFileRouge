namespace CarConnectAPI.Models
{
    public class Ride
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public double Distance { get; set; } 
        public double Duration { get; set; } 
        public string? Notes { get; set; }
    }
    {
    }
}

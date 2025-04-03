namespace CarConnectAPI.Models
{
    public class Message
    {
        public int DriverId { get; set; }
        public int PassengerId { get; set; }

        public string? DepartureLocation { get; set; }
        public string? ArrivalLocation { get; set; }

        public int? AvailableSeat { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }

}

using CarConnectAPI.Models;

namespace CarConnectAPI.DTOs
{
    public class RideDTO
    {
        public string? Id { get; set; }
        public string? DepartureLocation { get; set; }
        public string? ArrivalLocation { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int AvailableSeats { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public bool NoSmoking { get; set; }
        public bool PetsAllowed { get; set; }
    }
}

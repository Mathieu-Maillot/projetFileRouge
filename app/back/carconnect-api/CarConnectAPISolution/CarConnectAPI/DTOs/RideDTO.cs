using CarConnectAPI.Models;

namespace CarConnectAPI.DTOs;

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
    public List<User> Passengers { get; set; }
    public static RideDTO FromEntity(Ride ride)
    {
        return new RideDTO
        {
            DepartureLocation = ride.DepartureLocation,
            ArrivalLocation = ride.ArrivalLocation,
            DepartureTime = ride.DepartureTime,
            AvailableSeats = ride.AvailableSeats,
            Price = ride.Price,
            Description = ride.Description,
            NoSmoking = ride.NoSmoking,
            PetsAllowed = ride.PetsAllowed,
            Passengers = ride.Passengers,
        };
    }
}
   

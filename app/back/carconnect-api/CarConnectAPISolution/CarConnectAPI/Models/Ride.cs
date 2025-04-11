using CarConnectAPI.Helpers;
using MongoDB.Bson.Serialization.Attributes;

namespace CarConnectAPI.Models
{
    public class Ride
    {
        [BsonId]
        public string Id { get; set; } = RandomStringGenerator.StringGenerator(12);
        public string DepartureLocation { get; set; }
        public string ArrivalLocation { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string DriverId { get; set; }
        public int AvailableSeats { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public decimal Price { get; set; }
        public string? Description {  get; set; }
        public bool NoSmoking { get; set; }
        public bool PetsAllowed { get; set; }
        public List<User> Passengers { get; set; } = [];
    }
}

using CarConnectAPI.Models;

namespace CarConnectAPI.Services.Interfaces
{
    public interface IRideService<T,Tid> where T : class
    {
        Task<List<T>> GetAllRidesAsync();
        Task<T> GetRideByIdAsyn(Tid rideId);
        Task<T> CreateRideAsync(T ride);
        Task<bool> UpdateRideAsync(Tid rideId, T ride);
        Task<bool> DeleteRideAsync(Tid ride);
        Task<IEnumerable<Ride>> GetRidesByDriverIdAsync(string driverId);
        Task<IEnumerable<Ride>> SearchRidesAsync(string departure, string arrival, DateTime? date);
    }
}

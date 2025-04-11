using CarConnectAPI.Models;

namespace CarConnectAPI.Repositories.Interfaces
{
    public interface IRideRepository<T,Tid> where T : class
    {
        Task<List<T>> GetAllRideAsync();
        Task<T> GetRideByIdAsync(Tid rideId);
        Task<bool> CreateRideAsync(T Ride);
        Task<bool> UpdateAsync(Tid rideId, T ride);
        Task<bool> DeleteAsync(Tid rideId);
        Task<IEnumerable<T>> GetRideByDriverIdAsync(Tid driverId);
        Task<IEnumerable<T>> SearchRidesAsync(string departure, string arrival, DateTime? date);
    }
}

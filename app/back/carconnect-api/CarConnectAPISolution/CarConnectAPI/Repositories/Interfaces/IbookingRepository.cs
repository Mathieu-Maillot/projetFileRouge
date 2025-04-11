using CarConnectAPI.Models;

namespace CarConnectAPI.Repositories.Interfaces
{
    public interface IBookingRepository <T,Tid> where T : class
    {
        Task<List<T>> GetAllAsync();
        Task<T?> GetByIdAsync(Tid id);
        Task<List<T>> GetByUserIdAsync(Tid userId);
        Task<List<T>> GetByRideIdAsync(Tid rideId);
        Task<T> CreateAsync(T booking);
        Task<bool> UpdateAsync(Tid bookingId, T booking);
        Task<bool> DeleteAsync(Tid bookingId);
    }
}

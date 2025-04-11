namespace CarConnectAPI.Services.Interfaces
{
    public interface IBookingService<T, Tid> where T : class
    {
        Task<List<T>> GetAllBookingsAsync();
        Task<T?> GetBookingByIdAsync(Tid bookingId);
        Task<List<T>> GetBookingsByUserIdAsync(Tid userId);
        Task<List<T>> GetBookingsByRideIdAsync(Tid rideId);
        Task<T> CreateBookingAsync(T booking);
        Task<bool> UpdateBookingAsync(Tid bookingId, T booking);
        Task<bool> DeleteBookingAsync(Tid BookingId);
    }
}

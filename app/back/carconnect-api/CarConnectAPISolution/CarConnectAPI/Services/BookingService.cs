using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using CarConnectAPI.Services.Interfaces;
using MongoDB.Driver;

namespace CarConnectAPI.Services
{
    public class BookingService : IBookingService<Booking, string>
    {
        private readonly IbookingRepository<Booking, string> _bookingRepository;

        public BookingService(IbookingRepository<Booking, string> bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        public async Task<Booking> CreateBookingAsync(Booking booking) 
        {
            booking.CreatedAt = DateTime.UtcNow;
            booking.UpdatedAt = DateTime.UtcNow;
            await _bookingRepository.CreateAsync(booking);
            return booking;
        }

        public async Task<List<Booking>> GetAllBookingsAsync() =>
            await _bookingRepository.GetAllAsync();

        public async Task<Booking?> GetBookingByIdAsync(string bookingId) => 
            await _bookingRepository.GetByIdAsync(bookingId);

        public async Task<List<Booking>> GetBookingsByRideIdAsync(string rideId) =>
            await _bookingRepository.GetByRideIdAsync(rideId);
            

        public async Task<List<Booking>> GetBookingsByUserIdAsync(string userId) => 
            await _bookingRepository.GetByUserIdAsync(userId);

        public async Task<bool> UpdateBookingAsync(string bookingId, Booking booking) =>
            await _bookingRepository.UpdateAsync(bookingId, booking);

        public async Task<bool> DeleteBookingAsync(string bookingId) =>
            await _bookingRepository.DeleteAsync(bookingId);
    }
}

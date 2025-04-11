using CarConnectAPI.Data;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using MongoDB.Driver;

namespace CarConnectAPI.Repositories
{
    public class BookingRepository : IbookingRepository<Booking, string>
    {
        private readonly IMongoCollection<Booking> _bookings;

        public BookingRepository(MongoDbContext dbContext)
        {
            _bookings = dbContext.GetCollection<Booking>("Bookings");
        }

        public async Task<Booking> CreateAsync(Booking booking)
        {
            await _bookings.InsertOneAsync(booking);
            return booking;
        }

        public async Task<List<Booking>> GetAllAsync()
        {
            return await _bookings.Find(_ => true).ToListAsync();
        }

        public async Task<Booking?> GetByIdAsync(string bookingId)
        {
            return await _bookings.Find(b => b.Id == bookingId).FirstOrDefaultAsync();
        }

        public Task<List<Booking>> GetByRideIdAsync(string rideId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Booking>> GetByUserIdAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateAsync(string bookingId, Booking booking)
        {
            booking.UpdatedAt = DateTime.UtcNow;
            var result = await _bookings.ReplaceOneAsync(b => b.Id == bookingId, booking);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string bookingId)
        {
            var result = await _bookings.DeleteOneAsync(b => b.Id == bookingId);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}

using CarConnectAPI.Data;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using MongoDB.Driver;

namespace CarConnectAPI.Repositories
{ 
    public class RideRepository : IRideRepository<Ride,string>
    {
        private readonly IMongoCollection<Ride> _rides;

        public RideRepository(MongoDbContext bdContext)
        {
            _rides = bdContext.GetCollection<Ride>("Rides");
        }

        public async Task<bool> CreateRideAsync(Ride ride)
        {
            try
            {
                ride.CreateAt = DateTime.UtcNow;
                ride.UpdateAt = DateTime.UtcNow;
                await _rides.InsertOneAsync(ride);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<Ride>> GetAllRideAsync()
        {
            return await _rides.Find(_ => true).ToListAsync();
        }

        public async Task<IEnumerable<Ride>> GetRideByDriverIdAsync(string driverId)
        {
            return await _rides.Find(r => r.DriverId == driverId).ToListAsync();
        }

        public async Task<Ride> GetRideByIdAsync(string rideId)
        {
            return await _rides.Find(r => r.Id == rideId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Ride>> SearchRidesAsync(string departure, string arrival, DateTime? date)
        {
            // Création de filtre de requête sur la collection Ride
            var filterBuilder = Builders<Ride>.Filter; 
            var filters = new List<FilterDefinition<Ride>>();
            // Filtre sur lieu de départ
            if (!string.IsNullOrEmpty(departure))
                filters.Add(filterBuilder.Eq(r => r.DepartureLocation, departure));
            // Filtre sur le lieu d'arriver
            if (!string.IsNullOrEmpty(arrival))
                filters.Add(filterBuilder.Eq(r => r.ArrivalLocation, arrival));
            // Filtre sur la date
            if (date.HasValue)
                filters.Add(filterBuilder.Gte(r => r.DepartureTime, date.Value.Date));

            // Construction du fitre avec l'ensemble des filtres précédents.
            var filter = filters.Any() ? filterBuilder.And(filters) : filterBuilder.Empty;

            return await _rides.Find(filter).ToListAsync();
        }

        public async Task<bool> UpdateAsync(string rideId, Ride ride)
        {
            ride.UpdateAt = DateTime.UtcNow;
            var result = await _rides.ReplaceOneAsync(r => r.Id == ride.Id, ride);
            // result.IsAcknowledged => opération reconnue par le serveur : renvoie un booleen et le nombre de documents modifiés par l'opération
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string rideId)
        {
            var result = await _rides.DeleteOneAsync(r => r.Id == rideId);
            // result.IsAcknowledged => opération reconnue par le serveur : renvoie un booleen et le nombre de documents supprimés par l'opération
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}

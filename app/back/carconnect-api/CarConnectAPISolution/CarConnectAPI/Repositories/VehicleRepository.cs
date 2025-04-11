using CarConnectAPI.Data;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace CarConnectAPI.Repositories
{
    public class VehicleRepository : IVehicleRepository<Vehicle, string>
    {
        private readonly IMongoCollection<User> _usersCollection;

        public VehicleRepository(MongoDbContext mongoDbContext)
        {
            _usersCollection = mongoDbContext.GetCollection<User>("users");
        }

        public async Task CreateVehicleAsync(string userId, Vehicle vehicle)
        {
            var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user != null)
            {
                user.Vehicles.Add(vehicle);
                user.UpdateAt = DateTime.UtcNow;
                await _usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
            }
            else
            {
                throw new Exception("User not found.");
            }
        }

        public async Task<Vehicle> GetVehicleByUserIdAsync(string userId, string vehicleId)
        {
            var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) throw new Exception("User not found.");
            if (user.Vehicles.Count == 0) throw new Exception("No vehicles found for the user.");

            var vehicle = user.Vehicles.FirstOrDefault(v => v.Id == vehicleId);
            if (vehicle == null) throw new Exception("Vehicle not found.");
            return vehicle;
        }

        public async Task<List<Vehicle>> GetVehiclesByUserIdAsync(string userId)
        {
            var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) throw new Exception("User not found.");
            return user.Vehicles;
        }

        public async Task UpdateVehicleAsync(string userId, Vehicle vehicle)
        {
            var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) throw new Exception("User not found.");
            if (user.Vehicles.Count == 0) throw new Exception("No vehicles found for the user.");

            var existingVehicle = user.Vehicles.FirstOrDefault(v => v.Id == vehicle.Id);
            if (existingVehicle == null) throw new Exception("Vehicle not found.");

            existingVehicle.Brand = vehicle.Brand;
            existingVehicle.Model = vehicle.Model;
            existingVehicle.Capacity = vehicle.Capacity;
            existingVehicle.LastUpdatedAt = DateTime.UtcNow;

            user.UpdateAt = DateTime.UtcNow;
            await _usersCollection.ReplaceOneAsync(u => u.Id == userId, user);
        }

        public async Task DeleteVehicleAsync(string userId, string VehicleId)
        {
            var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) throw new Exception("User not found.");

            if (user.Vehicles.Count == 0) throw new Exception("No vehicles found for the user.");

            var vehicle = user.Vehicles.FirstOrDefault(v => v.Id == VehicleId);
            if (vehicle == null) throw new Exception("Vehicle not found.");

            user.Vehicles.Remove(vehicle);
            user.UpdateAt = DateTime.UtcNow;

            await _usersCollection.ReplaceOneAsync(u => u.Id == userId, user);
        }
    }
}

using MongoDB.Bson;
using UserMicroservice.Repositories.Interfaces;
using UserMicroservice.Services.Interfaces;
using UserMicroService.Models;
using UserMicroService.Repositories.Interfaces;

namespace UserMicroservice.Services
{
    public class VehicleService : IVehicleService<Vehicle, ObjectId>
    {
        private readonly IVehicleRepository<Vehicle, ObjectId> _vehicleRepository;

        public VehicleService(IVehicleRepository<Vehicle, ObjectId> vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task CreateVehicleAsync(ObjectId userId, Vehicle vehicle)
        {
            try
            {
                await _vehicleRepository.CreateVehicleAsync(userId, vehicle);
            }
            catch (Exception ex) 
            {
                throw new Exception($"Error creating vehicle: {ex.Message}");
            }
        }

        public async Task<Vehicle> GetVehicleByUserIdAsync(ObjectId userId, ObjectId vehicleId)
        {
            try
            {
                return await _vehicleRepository.GetVehicleByUserIdAsync(userId, vehicleId);
            }
            catch (Exception ex)
            {
                // Loggez ou gérez l'exception selon les besoins
                throw new Exception($"Error fetching vehicle: {ex.Message}");
            }
        }

        public async Task<List<Vehicle>> GetVehiclesByUserIdAsync(ObjectId userId)
        {
            try
            {
                return await _vehicleRepository.GetVehiclesByUserIdAsync(userId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching vehicles: {ex.Message}");
            }
        }

        public async Task UpdateVehicleAsync(ObjectId userId, Vehicle vehicle)
        {
            try
            {
                await _vehicleRepository.UpdateVehicleAsync(userId, vehicle);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating vehicle: {ex.Message}");
            }
        }

        public async Task DeleteVehicleAsync(ObjectId userId, ObjectId VehicleId)
        {
            
        }
    }
}

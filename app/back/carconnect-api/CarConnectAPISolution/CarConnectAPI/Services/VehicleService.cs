using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using CarConnectAPI.Services.Interfaces;
using MongoDB.Bson;

namespace CarConnectAPI.Services
{
    public class VehicleService : IVehicleService<Vehicle, string>
    {
        private readonly IVehicleRepository<Vehicle, string> _vehicleRepository;

        public VehicleService(IVehicleRepository<Vehicle, string> vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task CreateVehicleAsync(string userId, Vehicle vehicle)
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

        public async Task<Vehicle> GetVehicleByUserIdAsync(string userId, string vehicleId)
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

        public async Task<List<Vehicle>> GetVehiclesByUserIdAsync(string userId)
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

        public async Task UpdateVehicleAsync(string userId, Vehicle vehicle)
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

        public async Task DeleteVehicleAsync(string userId, string VehicleId)
        {
            try
            {
                await _vehicleRepository.DeleteVehicleAsync(userId, VehicleId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting vehicle: {ex.Message}");
            }
        }
    }
}

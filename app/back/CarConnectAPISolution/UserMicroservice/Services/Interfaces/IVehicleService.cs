using MongoDB.Bson;
using UserMicroService.Models;

namespace UserMicroservice.Services.Interfaces
{
    public interface IVehicleService<T,Tid> where T : class
    {
        Task<T> GetVehicleByUserIdAsync(Tid userId, Tid vehicleId);
        Task<List<T>> GetVehiclesByUserIdAsync(Tid userId);
        Task CreateVehicleAsync(Tid userId, T vehicle);
        Task UpdateVehicleAsync(Tid userId, T vehicle);
        Task DeleteVehicleAsync(Tid userId, Tid VehicleId);
    }
}

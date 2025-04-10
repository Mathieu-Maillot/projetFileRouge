using MongoDB.Bson;
using UserMicroService.Models;

namespace UserMicroservice.Repositories.Interfaces
{
    public interface IVehicleRepository<T,Tid> where T : class
    {
        Task CreateVehicleAsync(Tid userId, T vehicle);
        Task<T> GetVehicleByUserIdAsync(Tid userId, Tid vehicleId);
        Task<List<T>> GetVehiclesByUserIdAsync(Tid userId);
        Task UpdateVehicleAsync(Tid userId,T vehicle);
        Task DeleteVehicleAsync(Tid userId, Tid VehicleId);
    }
}

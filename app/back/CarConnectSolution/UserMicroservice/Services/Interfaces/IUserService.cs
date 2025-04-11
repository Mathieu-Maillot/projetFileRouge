using System.Linq.Expressions;
using MongoDB.Bson;
using UserMicroservice.Models;

namespace UserMicroservice.Services.Interfaces
{
    public interface IUserService<T, Tid> where T : class
    {
        Task<T> CreateUserAsync(T user);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate);
        Task<T?> GetUserByIdAsync(Tid id);
        Task<T?> GetUserAsync(Expression<Func<T, bool>> predicate);
        Task<T?> UpdateUserAsync(T user);
        Task<bool> DeleteUserAsync(Tid id);
        
        //Vehicle Services
        Task CreateVehicleForUserAsync(Tid userID, Vehicle userVehicle);
        Task<IEnumerable<Vehicle>> GetVehiclesForUserAsync(Tid userId);
        Task UpdateVehicleForUserAsync(Tid userId, Vehicle userVehicle);
        Task DeleteVehicleForUserAsync(Tid userId, Tid vehicleId);

        //Review Services
        //Review Methods
        Task CreateReviewForUserAsync(Tid userId, Review review);
        Task<IEnumerable<Review>> GetReviewForUserAsync(Tid userId);
        Task UpdateReviewForUserAsync(Tid userId, Review review);
        Task DeleteReviewForUserAsync(Tid userId, ObjectId reviewId);
    }
}

using System.Linq.Expressions;
using MongoDB.Bson;
using UserMicroservice.Models;

namespace UserMicroservice.Repositories.Interface
{
    public interface IRepository <T,Tid> where T : class
    {
        Task<T> CreateAsync(T entity);
        Task<T?> GetByIdAsync(Tid id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate);
        Task<T?> GetAsync(Expression<Func<T, bool>> predicate);
        Task<T?> UpdateAsync(T entity);
        Task<bool> DeleteAsync(Tid id);

        //Vehicle Methods
        Task CreateVehicleForUserAsync(Tid userId, Vehicle userVehicle);
        Task<IEnumerable<Vehicle>> GetVehiclesForUserAsync(Tid userId);
        Task UpdateVehicleForUserAsync(Tid userId, Vehicle userVehicle);
        Task DeleteVehicleForUserAsync(Tid userId, Tid vehicleId);

        //Review Methods
        Task CreateReviewForUserAsync(Tid userId, Review review);
        Task<IEnumerable<Review>> GetReviewForUserAsync(Tid userId);
        Task UpdateReviewForUserAsync(Tid userId, Review review);
        Task DeleteReviewForUserAsync(Tid userId, ObjectId reviewId);
    }
}

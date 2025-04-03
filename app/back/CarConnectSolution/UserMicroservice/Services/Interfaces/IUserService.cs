using System.Linq.Expressions;
using MongoDB.Bson;
using UserMicroservice.Models;

namespace UserMicroservice.Services.Interfaces
{
    public interface IUserService
    {

        Task<IEnumerable<User>> GetAllAsync();
        Task<IEnumerable<User>> GetAllAsync(Expression<Func<User, bool>> predicate);
        Task<User?> GetUserByIdAsync(ObjectId id);
        Task<User?> GetUserAsync(Expression<Func<User, bool>> predicate);
        Task<User> CreateUserAsync(User user);
        Task<User?> UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(ObjectId id);
    }
}

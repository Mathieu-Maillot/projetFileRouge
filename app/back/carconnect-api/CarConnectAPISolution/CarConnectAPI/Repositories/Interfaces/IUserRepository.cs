using System.Linq.Expressions;
using System.Security.Cryptography;

namespace CarConnectAPI.Repositories.Interfaces
{
    public interface IUserRepository<T,Tid> where T : class
    {
        Task<T> CreateAsync(T user);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate);
        Task<T?> GetByIdAsync(Tid userId);
        Task<T?> GetAsync(Expression<Func<T, bool>> predicate);
        Task<T> UpdateAsync(T user);
        Task<bool> DeleteAsync(Tid user);
    }
}

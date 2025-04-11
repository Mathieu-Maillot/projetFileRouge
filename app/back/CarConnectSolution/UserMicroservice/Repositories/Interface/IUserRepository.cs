using System.Linq.Expressions;
using System.Security.Cryptography;

namespace UserMicroservice.Repositories.Interface
{
    public interface IUserService<T, Tid> where T : class
    {
        Task<T> CreateAsync(T User);
        Task<T?> GetByIdAsync(Tid userId);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate);
        Task<T?> GetAsync(Expression<Func<T, bool>> predicate);
        Task<T?> UpdateAsync(T User);
        Task<bool> DeleteAsync(Tid userId);
    }
}

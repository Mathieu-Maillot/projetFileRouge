using System.Linq.Expressions;

namespace CarConnectAPI.Services.Interfaces
{
    public interface IUserService<T, Tid> where T : class
    {
        Task<T> CreateUserAsync(T user);
        Task<IEnumerable<T>> GetAllUserAsync();
        Task<IEnumerable<T>> GetAllUserAsync(Expression<Func<T, bool>> predicate);
        Task<T?> GetUserByIdAsync(Tid userId);
        Task<T?> GetUserAsync(Expression<Func<T, bool>> predicate);
        Task<T> UpdateUserAsync(T user);
        Task<bool> DeleteUserAsync(Tid user);
    }
}

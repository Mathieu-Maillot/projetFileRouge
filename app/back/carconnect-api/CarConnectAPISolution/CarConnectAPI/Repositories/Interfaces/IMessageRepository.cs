using System.Linq.Expressions;

namespace CarConnectAPI.Repositories.Interfaces
{
    public interface IMessageRepository<T,Tid> where T : class
    {
        Task<T> CreateMessageAsync(T message);
        Task<IEnumerable<T>> GetAllMessageAsync();
        Task<IEnumerable<T>> GetAllMessageAsync(Expression<Func<T,bool>> predicate);
        Task<T?> GetMessageByIdAsync (Tid messageId);
        Task<T?> GetMessageAsync(Expression<Func<T, bool>> predicate);
        Task<bool> UpdateMessageAsync(Tid messageId,T message);
        Task<bool> DeleteMessageAsync(Tid messageId);
    }
}

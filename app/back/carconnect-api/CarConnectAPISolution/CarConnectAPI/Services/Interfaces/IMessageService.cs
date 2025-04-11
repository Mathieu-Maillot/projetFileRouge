using System.Linq.Expressions;

namespace CarConnectAPI.Services.Interfaces
{
    public interface IMessageService<T,Tid> where T : class
    {
        Task<T> CreateMessageAsync(T message);
        Task<IEnumerable<T>> GetAllMessagesAsync();
        Task<IEnumerable<T>> GetAllMessagesAsync(Expression<Func<T,bool>> predicate);
        Task<T?> GetMessageByIdAsync(Tid messageId);
        Task<T?> GetMessageAsync(Expression<Func<T,bool>> predicate);
        Task<bool> UpdateMessageAsync(Tid MessageId, T message);
        Task<bool> DeleteMessageAsync(Tid messageId);
    }
}

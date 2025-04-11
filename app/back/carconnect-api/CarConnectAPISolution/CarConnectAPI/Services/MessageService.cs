using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using CarConnectAPI.Services.Interfaces;
using System.Linq.Expressions;

namespace CarConnectAPI.Services
{
    public class MessageService : IMessageService<Message,string>
    {
        private readonly IMessageRepository<Message,string> _messageRepository;

        public MessageService(IMessageRepository<Message, string> messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public async Task<Message> CreateMessageAsync(Message message) => 
            await _messageRepository.CreateMessageAsync(message);

        public async Task<IEnumerable<Message>> GetAllMessagesAsync() =>
            await _messageRepository.GetAllMessageAsync();

        public async Task<IEnumerable<Message>> GetAllMessagesAsync(Expression<Func<Message, bool>> predicate) =>
            await _messageRepository.GetAllMessageAsync(predicate);

        public async Task<Message?> GetMessageAsync(Expression<Func<Message, bool>> predicate) =>
            await _messageRepository.GetMessageAsync(predicate);

        public Task<Message?> GetMessageByIdAsync(string messageId) => 
            _messageRepository.GetMessageByIdAsync(messageId);

        public Task<bool> UpdateMessageAsync(string MessageId, Message message) =>
            _messageRepository.UpdateMessageAsync(MessageId, message);

        public Task<bool> DeleteMessageAsync(string messageId) =>
            _messageRepository.DeleteMessageAsync(messageId);
    }
}

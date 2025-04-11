using CarConnectAPI.Data;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace CarConnectAPI.Repositories
{
    public class MessageRepository : IMessageRepository<Message,string>
    {
        private readonly IMongoCollection<Message> _messages;

        public MessageRepository(MongoDbContext dbContext)
        {
            _messages = dbContext.GetCollection<Message>("Messages");
        }

        public async Task<Message> CreateMessageAsync(Message message)
        {
            await _messages.InsertOneAsync(message);
            return message;
        }

        public async Task<IEnumerable<Message>> GetAllMessageAsync()
        {
            return await _messages.Find(_ => true).ToListAsync();
        }

        public async Task<IEnumerable<Message>> GetAllMessageAsync(Expression<Func<Message, bool>> predicate)
        {
            return await _messages.Find(predicate).ToListAsync();
        }

        public async Task<Message?> GetMessageAsync(Expression<Func<Message, bool>> predicate)
        {
            return await _messages.Find(predicate).FirstOrDefaultAsync();
        }

        public async Task<Message?> GetMessageByIdAsync(string messageId)
        {
            return await _messages.Find(m => m.Id == messageId).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateMessageAsync(string messageId, Message message)
        {
            var result = await _messages.ReplaceOneAsync(m => m.Id == messageId, message);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteMessageAsync(string messageId)
        {
            var result = await _messages.DeleteOneAsync(m => m.Id == messageId);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}

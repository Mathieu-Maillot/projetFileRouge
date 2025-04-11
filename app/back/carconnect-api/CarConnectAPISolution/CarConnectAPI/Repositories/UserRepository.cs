using System;
using System.Linq.Expressions;
using CarConnectAPI.Data;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using MongoDB.Driver;

namespace CarConnectAPI.Repositories
{
    public class UserRepository : IUserRepository<User,string>
    {
        public readonly IMongoCollection<User> _users;

        public UserRepository(MongoDbContext context)
        {
            _users = context.GetCollection<User>("User");
        }

        public async Task<User> CreateAsync(User user)
        {
            await _users.InsertOneAsync(user);
            return user;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _users.Find(_ => true).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetAllAsync(Expression<Func<User, bool>> predicate)
        {
            return await _users.Find(predicate).ToListAsync();
        }

        public async Task<User?> GetAsync(Expression<Func<User, bool>> predicate)
        {
            return await _users.Find(predicate).FirstOrDefaultAsync();
        }

        public async Task<User?> GetByIdAsync(string userId)
        {
            return await _users.Find(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<User> UpdateAsync(User user)
        {
            var result = await _users.ReplaceOneAsync(u => u.Id == user.Id, user);
            if(result.IsAcknowledged && result.ModifiedCount > 0)
            {
                return user;
            }
            return null;
        }

        public async Task<bool> DeleteAsync(string userId)
        {
            var result = await _users.DeleteOneAsync(u => u.Id == userId);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}

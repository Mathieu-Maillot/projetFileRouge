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
        public readonly IMongoCollection<User> _userCollection;

        public UserRepository(MongoDbContext context)
        {
            _userCollection = context.GetCollection<User>("User");
        }

        public async Task<User> CreateAsync(User user)
        {
            await _userCollection.InsertOneAsync(user);
            return user;
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<User>> GetAllAsync(Expression<Func<User, bool>> predicate)
        {
            return await _userCollection.Find(predicate).ToListAsync();
        }

        public async Task<User?> GetAsync(Expression<Func<User, bool>> predicate)
        {
            return await _userCollection.Find(predicate).FirstOrDefaultAsync();
        }

        public async Task<User?> GetByIdAsync(string userId)
        {
            return await _userCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<User?> UpdateAsync(User user)
        {
            var updateUser = await _userCollection.ReplaceOneAsync(
                upUser => upUser.Id == user.Id,
                user
            );
            return updateUser.MatchedCount > 0 ? user : null;
        }

        public async Task<bool> DeleteAsync(User user)
        {
            var result = await _userCollection.DeleteOneAsync(u => u.Id == user.Id);
            return result.DeletedCount > 0;
        }
    }
}

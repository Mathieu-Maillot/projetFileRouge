using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;
using UserMicroService.Data;
using UserMicroService.Models;
using UserMicroService.Repositories.Interfaces;

namespace UserMicroService.Repositories
{
    public class UserRepository : IUserRepository<User,ObjectId>
    {
        public readonly IMongoCollection<User> _usersCollection;

        public UserRepository(MongoDbContext mongoDbContext)
        {
            _usersCollection = mongoDbContext.GetCollection<User>("users");
        }

        public async Task<User> CreateAsync(User user)
        {
            await _usersCollection.InsertOneAsync(user);
            return user;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _usersCollection.Find(user => true).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetAllAsync(Expression<Func<User, bool>> predicate)
        {
            return await _usersCollection.Find(predicate).ToListAsync();
        }

        public async Task<User?> GetAsync(Expression<Func<User, bool>> predicate)
        {
            return await _usersCollection.Find(predicate).FirstOrDefaultAsync();
        }

        public async Task<User?> GetByIdAsync(ObjectId userId)
        {
            return await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<User?> UpdateAsync(User user)
        {
            var updateUser = await _usersCollection.ReplaceOneAsync(
                upUser => upUser.Id == user.Id,
                user
            );
            return updateUser.MatchedCount > 0 ? user : null;
        }

        public async Task<bool> DeleteAsync(User user)
        {
            var result = await _usersCollection.DeleteOneAsync(u => u.Id == user.Id);
            return result.DeletedCount > 0;
        }
    }
}

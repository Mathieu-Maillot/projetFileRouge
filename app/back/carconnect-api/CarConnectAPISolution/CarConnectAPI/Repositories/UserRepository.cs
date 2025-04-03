using System.Linq.Expressions;
using CarConnectAPI.Data;
using CarConnectAPI.Models.Users;
using MongoDB.Driver;

namespace CarConnectAPI.Repositories
{
    public class UserRepository : IRepository<User, int>
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(ApplicationDbContext db)
        {
            _users = db.Users;
        }

        public async Task<User> Add(User user)
        {
            await _users.InsertOneAsync(user);
            return user;
        }

        public async Task<User?> GetById(int id)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, id);
            return await _users.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<User?> Get(Expression<Func<User, bool>> predicate)
        {
            return await _users.Find(predicate).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _users.Find(_ => true).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetAll(Expression<Func<User, bool>> predicate)
        {
            return await _users.Find(predicate).ToListAsync();
        }

        public async Task<User?> Update(User user)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, user.Id);
            var update = Builders<User>.Update
                .Set(u => u.FirstName, user.FirstName)
                .Set(u => u.LastName, user.LastName)
                .Set(u => u.Gender, user.Gender)
                .Set(u => u.BirthDate, user.BirthDate)
                .Set(u => u.Email, user.Email)
                .Set(u => u.PhoneNumber, user.PhoneNumber);

            var result = await _users.UpdateOneAsync(filter, update);
            if (result.ModifiedCount == 0)
                return null;

            return await GetById(user.Id);
        }

        public async Task<bool> Delete(int id)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, id);
            var result = await _users.DeleteOneAsync(filter);
            return result.DeletedCount > 0;
        }
    }
}

using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using UserMicroservice.Models;

namespace UserMicroservice.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext()
        {
            var mongoUri = Environment.GetEnvironmentVariable("MONGO_URI");
            var client = new MongoClient(mongoUri);
            _database = client.GetDatabase("gettingsStarted");
        }

        public IMongoCollection<User> UserCollection => _database.GetCollection<User>("Users");
        public List<Review> getReviewsByUserId(ObjectId userId)
        {
            var users = _database.GetCollection<User>("users")
                                 .Find(u => u.Id == userId)
                                 .FirstOrDefault();

            return User?.Review ?? new List<Review>();
        }
    }
}

using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using UserMicroservice.Models;

namespace UserMicroservice.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration config)
        {
            var username = config["MongoDb:Username"];
            var password = config["MongoDb:Password"];

            var connectionString = $"mongodb+srv://{username}:{password}@carconnect.ntsijlu.mongodb.net/?retryWrites=true&w=majority&appName=CarConnect"

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase("CarConnnectDatabase");
        }

        public IMongoCollection<T> GetCollection<T>(string collectionName) => _database.GetCollection<T>(collectionName);
    }
}

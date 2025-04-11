using MongoDB.Driver;

namespace CarConnectAPI.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            var username = configuration["MongoDb:Username"];
            var password = configuration["MongoDb:Password"];

            var connectionString = $"mongodb+srv://{username}:{password}@carconnect.ntsijlu.mongodb.net/?retryWrites=true&w=majority&appName=CarConnect";

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase("CarConnnectDatabase");
        }

        public IMongoCollection<T> GetCollection<T>(string collectionName) => _database.GetCollection<T>(collectionName);
    }
}

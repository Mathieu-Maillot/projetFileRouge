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
            var cluster = configuration["MongoDb:Cluster"];
            var database = configuration["MongoDb:DatabaseName"];

            var connectionString = $"mongodb+srv://{username}:{password}@{cluster}/?retryWrites=true&w=majority&appName=CarConnect";

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(database);
        }

        public IMongoDatabase Database { get { return _database; } }

        public IMongoCollection<T> GetCollection<T>(string collectionName) => _database.GetCollection<T>(collectionName);
    }
}

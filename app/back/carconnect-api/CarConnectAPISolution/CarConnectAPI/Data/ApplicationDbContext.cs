using CarConnectAPI.Models.Users;
using MongoDB.Driver;

namespace CarConnectAPI.Data
{
    public class ApplicationDbContext
    {
        public IMongoCollection<User> Users { get; set; }
        private readonly IMongoDatabase _db;

        public ApplicationDbContext(string connectionString, string databaseName)
        {
            var client = new MongoClient(connectionString);
            _db = client.GetDatabase(databaseName);
            Users = _db.GetCollection<User>("Users");
        }
    }
}

using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace CarConnectAPI.Data
{
    public class ApplicationDbContext
    {
        private readonly IMongoDatabase _db;

        public ApplicationDbContext(string connectionString, string databaseName)
        {
            // create an instance of the MongoDB client and connects to the database
            var client = new MongoClient(connectionString);
            _db = client.GetDatabase(databaseName);
        }

        //Example to access at a collection in the database
        //public IMongoCollection<Entity> MyEntities => _db.GetCollection<Entity>("MyEntities")
    }
}

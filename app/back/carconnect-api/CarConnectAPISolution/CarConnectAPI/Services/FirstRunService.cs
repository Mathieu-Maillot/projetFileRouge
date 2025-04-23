
using CarConnectAPI.Data;
using CarConnectAPI.Helpers;
using CarConnectAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CarConnectAPI.Services
{
    public class FirstRunService : IHostedService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly Encryptor _encryptor;
        private readonly IMongoCollection<User> _users;

        public FirstRunService(IServiceScopeFactory scopeFactory, IOptions<AppSettings> appSettings)
        {
            _scopeFactory = scopeFactory;
            _encryptor = new Encryptor(/*appSettings.Value.SecretKey*/);
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<MongoDbContext>();

            var user = await dbContext.GetCollection<User>("Users").FindAsync(user => user.Role == ConstantValues.RoleAdmin);
            //var user = _users.Find(user => user.Role == ConstantValues.RoleAdmin).FirstOrDefault();
            if (user.FirstOrDefault<User> == null)
            {
                var userAdmin = new User
                {
                    Email = "admin@admin.com",
                    Role = ConstantValues.RoleAdmin,
                    Password = _encryptor.EncryptPassword("P@ssWord!12"),
                    CreatedAt = DateTime.UtcNow,
                } ;

                try
                {
                    await _users.InsertOneAsync(userAdmin);
                }
                catch (Exception ex)
                {
                    throw new Exception("Root Admin could not be created");
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}

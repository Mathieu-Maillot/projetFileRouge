using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;
using UserMicroservice.Data;
using UserMicroservice.Models;
using UserMicroservice.Repositories.Interface;

namespace UserMicroservice.Repositories
{
    public class UserRepository : IRepository<User, ObjectId>
    {
        public readonly MongoDbContext _db;
        public readonly IMongoCollection<User> _userCollection;

        public UserRepository(MongoDbContext db)
        {
            _db = db;
            _userCollection = _db.UserCollection;
        }

        public async Task<User> CreateAsync(User entity)
        {
            await _userCollection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _userCollection.Find(user => true).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetAllAsync(Expression<Func<User, bool>> predicate)
        {
            return await _userCollection.Find(predicate).ToListAsync();
        }

        public async Task<User?> GetAsync(Expression<Func<User, bool>> predicate)
        {
            return await _userCollection.Find(predicate).FirstOrDefaultAsync();
        }

        public async Task<User?> GetByIdAsync(ObjectId id)
        {
            return await _userCollection.Find(user => user.Id == id).FirstOrDefaultAsync();
        }

        public async Task<User?> UpdateAsync(User entity)
        {
            var newEntity = await _userCollection.ReplaceOneAsync(
                user => user.Id == entity.Id,
                entity
            );
            return newEntity.MatchedCount > 0 ? entity : null;
        }

        public async Task<bool> DeleteAsync(ObjectId id)
        {
            var result = await _userCollection.DeleteOneAsync(user =>  user.Id == id);
            return result.DeletedCount > 0;
        }

        public async Task CreateVehicleForUserAsync(ObjectId userId, Vehicle userVehicle)
        {
            var user = await GetByIdAsync(userId);
            if (user != null)
            {
                user.VehicleUser.Add(userVehicle);
                await UpdateAsync(user);
            }
        }

        public async Task<IEnumerable<Vehicle>> GetVehiclesForUserAsync(ObjectId userId)
        {
            var user = await GetByIdAsync(userId);
            return user?.VehicleUser ?? Enumerable.Empty<Vehicle>();
        }

        public async Task UpdateVehicleForUserAsync(ObjectId userId, Vehicle userVehicle)
        {
            var user = await GetByIdAsync(userId);
            if (user != null)
            {
                var existingVehicle = user.VehicleUser.FirstOrDefault(v => v.Id == userVehicle.Id);
                if (existingVehicle != null)
                {
                    existingVehicle.Brand = userVehicle.Brand;
                    existingVehicle.Model = userVehicle.Model;
                    existingVehicle.Capacity = userVehicle.Capacity;
                    existingVehicle.UpdatedAt = userVehicle.UpdatedAt;
                    await UpdateAsync(user);
                }
            }
        }

        public async Task DeleteVehicleForUserAsync(ObjectId userId, ObjectId vehicleId)
        {
            var user = await GetByIdAsync(userId);
            if (user != null)
            {
                var vehicle = user.VehicleUser.FirstOrDefault(v => v.Id == vehicleId);
                if(vehicle != null)
                {
                    user.VehicleUser.Remove(vehicle);
                    await UpdateAsync(user);
                }
            }
        }

        public async Task CreateReviewForUserAsync(ObjectId userId, Review review)
        {
            var user = await GetByIdAsync(userId);
            if (user != null)
            {
                user.Reviews.Add(review);
                await UpdateAsync(user);
            }
        }

        public async Task<IEnumerable<Review>> GetReviewForUserAsync(ObjectId userId)
        {
            var user = await GetByIdAsync(userId);
            return user?.Reviews ?? Enumerable.Empty<Review>();
        }

        public async Task UpdateReviewForUserAsync(ObjectId userId, Review review)
        {
            var user = await GetByIdAsync(userId);
            if (user != null)
            {
                var existingReview = user.Reviews.FirstOrDefault(r => r.Id == review.Id);
                if(existingReview != null)
                {
                    existingReview.Rating = review.Rating;
                    existingReview.Comment = review.Comment;
                    existingReview.UpdateAd = DateTime.UtcNow;
                    await UpdateAsync(user);
                }
            }
        }

        public async Task DeleteReviewForUserAsync(ObjectId userId, ObjectId reviewId)
        {
            var user = await GetByIdAsync(userId);
            if(user != null)
            {
                var reviewToRemove = user.Reviews.FirstOrDefault(r => r.Id == reviewId);
                if (reviewToRemove != null)
                {
                    user.Reviews.Remove(reviewToRemove);
                    await UpdateAsync(user);
                }
            }
        }
    }
}

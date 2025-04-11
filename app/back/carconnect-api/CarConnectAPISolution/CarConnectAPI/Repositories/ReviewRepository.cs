using CarConnectAPI.Data;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using MongoDB.Driver;

namespace CarConnectAPI.Repositories
{
    public class ReviewRepository : IReviewRepository<Review, string>
    {
        private readonly IMongoCollection<User> _usersCollection;

        public ReviewRepository(MongoDbContext dbContext)
        {
            _usersCollection = dbContext.GetCollection<User>("User");
        }

        public async Task CreateReviewAsync(string userId, Review review)
        {
            if (review == null) throw new ArgumentNullException(nameof(review));

            var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) throw new ArgumentException("User not found.");

            user.Reviews.Add(review);
            user.UpdateAt = DateTime.UtcNow;

            await _usersCollection.ReplaceOneAsync(u => u.Id == userId, user);
        }

        public async Task<Review> GetReviewByUserIdAsync(string userId, string reviewId)
        {
            var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) throw new ArgumentException("User not found.");

            var review = user.Reviews.FirstOrDefault(r => r.Id == reviewId);
            if (review == null) throw new ArgumentException("Review not found.");

            return review;
        }

        public async Task<List<Review>> GetReviewsByUserIdAsync(string userId)
        {
            var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) throw new ArgumentException("User not found.");

            return user.Reviews;
        }

        public async Task UpdateReviewAsync(string userId, Review review)
        {
            if (review == null) throw new ArgumentException(nameof(review));
            var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) throw new ArgumentException("User not found.");

            var existingReview = user.Reviews.FirstOrDefault(r => r.Id == review.Id);
            if (existingReview == null) throw new ArgumentException("Review not found");

            existingReview.Rating = review.Rating;
            existingReview.Comment = review.Comment;
            existingReview.LastUpdatedAt = DateTime.UtcNow;

            user.UpdateAt = DateTime.UtcNow;

            await _usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
        }
        public async Task DeleteReviewAsync(string userId, string reviewId)
        {
            var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) throw new ArgumentException("User not found.");

            var review = user.Reviews.FirstOrDefault(r => r.Id == reviewId);
            if (review == null) throw new ArgumentException("Review not found for this user.");

            user.Reviews.Remove(review);
            user.UpdateAt = DateTime.UtcNow;

            await _usersCollection.ReplaceOneAsync(u => u.Id == userId, user);
        }
    }
}

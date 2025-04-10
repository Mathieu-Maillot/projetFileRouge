using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using CarConnectAPI.Services.Interfaces;
using MongoDB.Bson;

namespace CarConnectAPI.Services
{
    public class ReviewService : IReviewService<Review, string>
    {
        private readonly IReviewRepository<Review, string> _reviewRepository;

        public ReviewService(IReviewRepository<Review, string> reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        public async Task CreateReviewAsync(string userId, Review review)
        {
            try
            {
                await _reviewRepository.CreateReviewAsync(userId, review);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating Review: {ex.Message}");
            }
        }

        public async Task<Review> GetReviewByUserIdAsync(string userId, string reviewId)
        {
            try
            {
                return await _reviewRepository.GetReviewByUserIdAsync(userId, reviewId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching Review: {ex.Message}");
            }
        }

        public async Task<List<Review>> GetReviewsByUserIdAsync(string userId)
        {
            try
            {
                return await _reviewRepository.GetReviewsByUserIdAsync(userId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching Reviews: {ex.Message}");
            }
        }

        public async Task UpdateReviewAsync(string userId, Review review)
        {
            try
            {
                await _reviewRepository.UpdateReviewAsync(userId, review);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating Reviews: {ex.Message}");
            }
        }

        public async Task DeleteReviewAsync(string userId, string reviewId)
        {
            try
            {
                await _reviewRepository.DeleteReviewAsync(userId, reviewId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating Reviews: {ex.Message}");
            }
        }
    }
}

using MongoDB.Bson;
using UserMicroService.Models;
using UserMicroservice.Repositories.Interfaces;
using UserMicroservice.Services.Interfaces;
using UserMicroservice.Repositories;

namespace UserMicroservice.Services
{
    public class ReviewService : IReviewService<Review, ObjectId>
    {
        private readonly IReviewRepository<Review, ObjectId> _reviewRepository;

        public ReviewService(IReviewRepository<Review, ObjectId> reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        public async Task CreateReviewAsync(ObjectId userId, Review vehicle)
        {
            try
            {
                await _reviewRepository.CreateReviewAsync(userId, vehicle);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating Review: {ex.Message}");
            }
        }

        public async Task<Review> GetReviewByUserIdAsync(ObjectId userId, ObjectId vehicleId)
        {
            try
            {
                return await _reviewRepository.GetReviewByUserIdAsync(userId, vehicleId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching Review: {ex.Message}");
            }
        }

        public async Task<List<Review>> GetReviewsByUserIdAsync(ObjectId userId)
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

        public async Task UpdateReviewAsync(ObjectId userId, Review vehicle)
        {
            try
            {
                await _reviewRepository.UpdateReviewAsync(userId, vehicle);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating Reviews: {ex.Message}");
            }
        }

        public async Task DeleteReviewAsync(ObjectId userId, ObjectId VehicleId)
        {
            try
            {
                await _reviewRepository.DeleteReviewAsync(userId, VehicleId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating Reviews: {ex.Message}");
            }
        }
    }
}

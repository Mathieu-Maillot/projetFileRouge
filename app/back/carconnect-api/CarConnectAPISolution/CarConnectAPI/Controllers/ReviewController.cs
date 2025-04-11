using CarConnectAPI.DTOs;
using CarConnectAPI.Helpers;
using CarConnectAPI.Models;
using CarConnectAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace CarConnectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService<Review, string> _reviewService;

        public ReviewController(IReviewService<Review, string> reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReviewByUserId(string userId, [FromBody] ReviewDTO reviewDto)
        {
            try
            {
                if (reviewDto == null) return BadRequest("Review Data is required.");
                var review = new Review
                {
                    Id = RandomStringGenerator.StringGenerator(12),
                    Rating = reviewDto.Rating,
                    Comment = reviewDto.Comment,
                    CreatedAt = DateTime.UtcNow,
                    LastUpdatedAt = DateTime.UtcNow,
                };

                await _reviewService.CreateReviewAsync(userId, review);
                return CreatedAtAction(nameof(GetReviewByUserIdAsync), new { UserId = userId, reviewID = review.Id }, review);
            }
            catch (ArgumentException ex)
            {
                return BadRequest($"Error creating vehicle: {ex.Message}");
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("user/review/{reviewId}")]
        public async Task<IActionResult> GetReviewByUserIdAsync(string userId, string reviewId)
        {
            try
            {
                var review = await _reviewService.GetReviewByUserIdAsync(userId, reviewId);
                if (review == null) return NotFound("Review not found.");
                return Ok(review);
            }
            catch (ArgumentException ex)
            {
                return NotFound($"Error retrieving review: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetReviewsByUserIdAsync(string userId)
        {
            try
            {
                var reviews = await _reviewService.GetReviewsByUserIdAsync(userId);
                return Ok(reviews);
            }
            catch (ArgumentException ex)
            {
                return NotFound($"Error retrieving reviews: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut("{reviewId}")]
        public async Task<IActionResult> UpdateReviewAsync(string userId, string reviewId, [FromBody] ReviewDTO reviewDto)
        {
            if (reviewDto == null)
            {
                return BadRequest("Vehicle data is required.");
            }

            try
            {
                var review = new Review
                {
                    Id = reviewId,
                    UserId = userId,
                    Rating = reviewDto.Rating,
                    Comment = reviewDto.Comment,
                    LastUpdatedAt = DateTime.UtcNow,
                };

                await _reviewService.UpdateReviewAsync(userId, review);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound($"Error Updating review: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteVehicleAsync(string userId, string reviewId)
        {
            try
            {
                await _reviewService.DeleteReviewAsync(userId, reviewId);
                return NoContent();  // Status HTTP 204 : No Content
            }
            catch (ArgumentException ex)
            {
                return NotFound($"Error deleting review: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

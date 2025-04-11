using MongoDB.Bson;
using System.Security.Cryptography;
using UserMicroservice.Models;

namespace UserMicroservice.Repositories.Interface
{
    public interface IReviewRepository <T,Tid> where T : class
    {
        Task CreateReviewForUserAsync(Tid userId, Review review);
        Task<IEnumerable<Review>> GetReviewForUserAsync(Tid userId);
        Task UpdateReviewForUserAsync(Tid userId, Review review);
        Task DeleteReviewForUserAsync(Tid userId, ObjectId reviewId);
    }
}

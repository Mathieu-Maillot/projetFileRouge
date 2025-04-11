using MongoDB.Bson;
using UserMicroService.Models;

namespace UserMicroservice.Repositories.Interfaces
{
    public interface IReviewRepository<T,Tid> where T : class
    {
        Task CreateReviewAsync(Tid userId, T review);
        Task<T> GetReviewByUserIdAsync(Tid userId, Tid reviewId);
        Task<List<T>> GetReviewsByUserIdAsync(ObjectId userId);
        Task UpdateReviewAsync(Tid userId, T review);
        Task DeleteReviewAsync(Tid userId, Tid reviewId);
    }
}

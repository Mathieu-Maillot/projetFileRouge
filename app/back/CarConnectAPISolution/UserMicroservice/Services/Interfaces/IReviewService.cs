using System.Security.Cryptography;

namespace UserMicroservice.Services.Interfaces
{
    public interface IReviewService<T,Tid> where T : class
    {
        Task<T> GetReviewByUserIdAsync(Tid userId, Tid vehicleId);
        Task<List<T>> GetReviewsByUserIdAsync(Tid userId);
        Task CreateReviewAsync(Tid userId, T vehicle);
        Task UpdateReviewAsync(Tid userId, T vehicle);
        Task DeleteReviewAsync(Tid userId, Tid VehicleId);
    }
}

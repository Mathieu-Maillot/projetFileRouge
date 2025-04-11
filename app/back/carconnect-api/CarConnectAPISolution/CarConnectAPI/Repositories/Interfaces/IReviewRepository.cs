namespace CarConnectAPI.Repositories.Interfaces
{
    public interface IReviewRepository<T, Tid> where T : class
    {
        Task<T> GetReviewByUserIdAsync(Tid userId, Tid reviewId);
        Task<List<T>> GetReviewsByUserIdAsync(Tid userId);
        Task CreateReviewAsync(Tid userId, T review);
        Task UpdateReviewAsync(Tid userId, T review);
        Task DeleteReviewAsync(Tid userId, Tid reviewId);
    }
}

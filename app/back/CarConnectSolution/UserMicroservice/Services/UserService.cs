using System.Linq.Expressions;
using MongoDB.Bson;
using UserMicroservice.Models;
using UserMicroservice.Repositories.Interface;
using UserMicroservice.Services.Interfaces;

namespace UserMicroservice.Services
{
    public class UserService : IUserService<User,ObjectId>
    {
        private readonly IRepository<User, ObjectId> _userRepository;

        public UserService(IRepository<User, ObjectId> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            return await _userRepository.CreateAsync(user);
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            return _userRepository.GetAllAsync();
        }

        public Task<IEnumerable<User>> GetAllAsync(Expression<Func<User, bool>> predicate)
        {
            return _userRepository.GetAllAsync(predicate);
        }

        public Task<User?> GetUserAsync(Expression<Func<User, bool>> predicate)
        {
            return _userRepository.GetAsync(predicate);
        }

        public Task<User?> GetUserByIdAsync(ObjectId id)
        {
            return _userRepository.GetByIdAsync(id);
        }

        public async Task<User?> UpdateUserAsync(User user)
        {
            return await _userRepository.UpdateAsync(user);
        }
        public async Task<bool> DeleteUserAsync(ObjectId id)
        {
            return await _userRepository.DeleteAsync(id);
        }


        //Vehicle Methods
        public async Task CreateVehicleForUserAsync(ObjectId userID, Vehicle userVehicle)
        {
           await _userRepository.CreateVehicleForUserAsync(userID, userVehicle);
        }

        public async Task<IEnumerable<Vehicle>> GetVehiclesForUserAsync(ObjectId userId)
        {
            return await _userRepository.GetVehiclesForUserAsync(userId);
        }

        public async Task UpdateVehicleForUserAsync(ObjectId userId, Vehicle userVehicle)
        {
            await _userRepository.UpdateVehicleForUserAsync(userId, userVehicle);
        }

        public async Task DeleteVehicleForUserAsync(ObjectId userId, ObjectId vehicleId)
        {
           await _userRepository.DeleteVehicleForUserAsync(userId, vehicleId);
        }

        public async Task CreateReviewForUserAsync(ObjectId userId, Review review)
        {
            await _userRepository.CreateReviewForUserAsync(userId, review);
        }

        public async Task<IEnumerable<Review>> GetReviewForUserAsync(ObjectId userId)
        {
            return await _userRepository.GetReviewForUserAsync(userId);
        }

        public async Task UpdateReviewForUserAsync(ObjectId userId, Review review)
        {
            await _userRepository.UpdateReviewForUserAsync(userId, review);
        }

        public async Task DeleteReviewForUserAsync(ObjectId userId, ObjectId reviewId)
        {
            await _userRepository.DeleteReviewForUserAsync(userId, reviewId);
        }
    }
}

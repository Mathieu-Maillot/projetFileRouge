using System.Linq.Expressions;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using CarConnectAPI.Services.Interfaces;

namespace CarConnectAPI.Services
{
    public class UserService : IUserService<User,string>
    {
        private readonly IUserRepository<User, string> _repository;

        public UserService(IUserRepository<User, string> repository)
        {
            _repository = repository;
        }

        public async Task<User> CreateUserAsync(User user) => 
            await _repository.CreateAsync(user);
        
        public async Task<IEnumerable<User>> GetAllUserAsync() =>
            await _repository.GetAllAsync();

        public async Task<IEnumerable<User>> GetAllUserAsync(Expression<Func<User, bool>> predicate) => 
            await _repository.GetAllAsync(predicate);

        public async Task<User?> GetUserAsync(Expression<Func<User, bool>> predicate) =>
            await _repository.GetAsync(predicate);

        public async Task<User?> GetUserByIdAsync(string userId) => 
            await _repository.GetByIdAsync(userId);

        public async Task<User> UpdateUserAsync(User user) =>
            await _repository.UpdateAsync(user);

        public async Task<bool> DeleteUserAsync(String userId) =>
            await _repository.DeleteAsync(userId);
    }
}

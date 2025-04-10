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

        public Task<User> CreateUserAsync(User user) => 
            _repository.CreateAsync(user);
        

        public Task<bool> DeleteUserAsync(User user) => 
            _repository.DeleteAsync(user);

        public Task<IEnumerable<User>> GetAllUserAsync() =>
            _repository.GetAllAsync();

        public Task<IEnumerable<User>> GetAllUserAsync(Expression<Func<User, bool>> predicate) => 
            _repository.GetAllAsync(predicate);

        public Task<User?> GetUserAsync(Expression<Func<User, bool>> predicate) =>
            _repository.GetAsync(predicate);

        public Task<User?> GetUserByIdAsync(string userId) => 
            _repository.GetByIdAsync(userId);

        public Task<User?> UpdateUserAsync(User user) =>
            _repository.UpdateAsync(user);
    }
}

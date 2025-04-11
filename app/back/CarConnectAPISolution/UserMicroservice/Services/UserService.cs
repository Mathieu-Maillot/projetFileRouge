using System.Linq.Expressions;
using MongoDB.Bson;
using UserMicroService.Models;
using UserMicroService.Repositories.Interfaces;
using UserMicroService.Services.Interfaces;

namespace UserMicroService.Services
{
    public class UserService : IUserService<User, ObjectId>
    {
        private readonly IUserRepository<User, ObjectId> _repository;

        public UserService(IUserRepository<User, ObjectId> repository)
        {
            _repository = repository;
        }

        public  Task<User> CreateUserAsync(User user) =>
             _repository.CreateAsync(user);
        

        public Task<IEnumerable<User>> GetAllUserAsync() =>
            _repository.GetAllAsync();

        public Task<IEnumerable<User>> GetAllUserAsync(Expression<Func<User, bool>> predicate) =>
            _repository.GetAllAsync(predicate);

        public Task<User?> GetUserAsync(Expression<Func<User, bool>> predicate) =>
            _repository.GetAsync(predicate);

        public Task<User?> GetUserByIdAsync(ObjectId userId) =>
            _repository.GetByIdAsync(userId);

        public Task<User?> UpdateUserAsync(User user) =>
            _repository.UpdateAsync(user);

        public Task<bool> DeleteUserAsync(User user) =>
            _repository.DeleteAsync(user);
    }
}

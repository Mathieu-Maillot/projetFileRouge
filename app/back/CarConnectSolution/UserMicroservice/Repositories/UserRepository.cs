using MongoDB.Bson;
using UserMicroservice.Models;
using UserMicroservice.Repositories.Interface;

namespace UserMicroservice.Repositories
{
    public class UserRepository : IUserRepository<User,ObjectId>
    {
        private readonly IUserRepository<User, ObjectId> _repository;

        public UserService(IUserRepository<User, ObjectId> repository)
        {
            _repository = repository;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using Moq;
using UserMicroservice.Models;
using UserMicroservice.Repositories.Interface;
using UserMicroservice.Services;

namespace TDDCarConnect.ServicesTests
{
    [TestClass]
    public class UserServiceTest
    {
        private Mock<IRepository<User, ObjectId>> _mockUserRepository;
        private UserService _userService;

        [TestInitialize]
        public void SetUp()
        {
            _mockUserRepository = new Mock<IRepository<User, ObjectId>>();
            _userService = new UserService(_mockUserRepository.Object);
        }

        [TestMethod]
        public async Task CreateUserAsync_shouldCallRepositoryCreateAsync()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(),
                                  Firstname = "John",
                                  Lastname = "Doe"};
            _mockUserRepository.Setup(repo => repo.CreateAsync(It.IsAny<User>())).ReturnsAsync(user);

            // Act
            var result = await _userService.CreateUserAsync(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(user.Firstname, result.Firstname);
            Assert.AreEqual(user.Lastname, result.Lastname);
            _mockUserRepository.Verify(repo => repo.CreateAsync(It.IsAny<User>()), Times.Once);
        }

        [TestMethod]
        public async Task GetAllAsync_ShouldReturnListOfUser()
        {
            // Arrange
            var users = new List<User>
            {
                new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" },
                new User { Id = ObjectId.GenerateNewId(), Firstname = "Jane", Lastname = "Smith" }
            };
            _mockUserRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(users);

            // Act
            var result = await _userService.GetAllAsync();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count());
            _mockUserRepository.Verify(repo => repo.GetAllAsync(), Times.Once);
        }

        [TestMethod]
        public async Task GetUserAsync_ShouldReturnUser_WhenPredicateMatches()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" };
            Expression<Func<User, bool>> predicate = u => u.Firstname == "John";
            _mockUserRepository.Setup(repo => repo.GetAsync(predicate)).ReturnsAsync(user);

            //Act
            var result = await _userService.GetUserAsync(predicate);

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(user.Firstname, result.Firstname);
            _mockUserRepository.Verify(repo => repo.GetAsync(predicate), Times.Once);
        }

        [TestMethod]
        public async Task UpdateUserAsync_ShouldCallRepositoryUpdateAsync()
        {
            // Arrance
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" };
            _mockUserRepository.Setup(repo => repo.UpdateAsync(user)).ReturnsAsync(user);

            // Act
            var result = await _userService.UpdateUserAsync(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(user.Firstname, result.Firstname);
            _mockUserRepository.Verify(repo => repo.UpdateAsync(It.IsAny<User>()), Times.Once);
        }

        [TestMethod]
        public async Task DeletedUserAsync_ShouldCallReposituryDeleteAsync()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" };
            _mockUserRepository.Setup(repo => repo.DeleteAsync(user.Id)).ReturnsAsync(true);

            // Act
            var result = await _userService.DeleteUserAsync(user.Id);

            // Assert
            Assert.IsTrue(result);
            _mockUserRepository.Verify(repo => repo.DeleteAsync(user.Id), Times.Once);
        }


        // Vehicule parts userService tests
        [TestMethod]
        public async Task CreateVehiculeForUserAsync_shouldCallRepositoryCreateVehicleForUserAsync()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" };
            var vehicle = new Vehicle { Id = ObjectId.GenerateNewId(), Brand = "Tesla", Model = "Model S" };
            _mockUserRepository.Setup(repo => repo.CreateVehicleForUserAsync(user.Id, vehicle)).Returns(Task.CompletedTask);

            // Act
            await _userService.CreateVehicleForUserAsync(user.Id, vehicle);

            // Assert
            _mockUserRepository.Verify(repo => repo.CreateVehicleForUserAsync(user.Id, vehicle), Times.Once);
        }

        [TestMethod]
        public async Task GetVehiculesForUserAsync_ShouldReturnVehicles()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" };
            var vehicles = new List<Vehicle>
            {
                new Vehicle { Id = ObjectId.GenerateNewId(), Brand = "Tesla", Model = "Model S" },
                new Vehicle { Id = ObjectId.GenerateNewId(), Brand = "DMW", Model = "Model X9" }
            };
            _mockUserRepository.Setup(repo => repo.GetVehiclesForUserAsync(user.Id)).ReturnsAsync(vehicles);

            // Act
            var result = await _userService.GetVehiclesForUserAsync(user.Id);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count());
            _mockUserRepository.Verify(repo => repo.GetVehiclesForUserAsync(user.Id), Times.Once);
        }


        [TestMethod]
        public async Task UpdateVehicleForUserAsync_ShouldCallRepositoryUpdateVehicleForUserAsync()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" };
            var vehicle = new Vehicle { Id = ObjectId.GenerateNewId(), Brand = "Tesla", Model = "Model S" };
            _mockUserRepository.Setup(repo => repo.UpdateVehicleForUserAsync(user.Id, vehicle)).Returns(Task.CompletedTask);

            // Act
            await _userService.UpdateVehicleForUserAsync(user.Id, vehicle);

            // Assert
            _mockUserRepository.Verify(repo => repo.UpdateVehicleForUserAsync(user.Id, vehicle), Times.Once);

        }

        [TestMethod]
        public async Task DeleteVehicleForUserAsync_ShouldCallRepositoryDeleteVehiculeForUserAsync()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" }; 
            var vehicle = new Vehicle { Id = ObjectId.GenerateNewId(), Brand = "Tesla", Model = "Model S" };
            _mockUserRepository.Setup(repo => repo.DeleteVehicleForUserAsync(user.Id,vehicle.Id)).Returns(Task.CompletedTask);

            // Act
            await _userService.DeleteVehicleForUserAsync(user.Id, vehicle.Id);

            // Assert
            _mockUserRepository.Verify(repo => repo.DeleteVehicleForUserAsync(user.Id, vehicle.Id), Times.Once);
        }


        // Review part UserService Tests
        [TestMethod]
        public async Task CreateReviewForUserAsync_ShouldCallRepositoryCreateReviewAsync()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" };
            var review = new Review { Id = ObjectId.GenerateNewId(), Rating = 5, Comment = "Famous!" };
            _mockUserRepository.Setup(repo => repo.CreateReviewForUserAsync(user.Id, review));

            // Act
            await _userService.CreateReviewForUserAsync(user.Id, review);

            // Assert
            _mockUserRepository.Verify(repo => repo.CreateReviewForUserAsync(user.Id, review), Times.Once);
        }


        [TestMethod]
        public async Task GetReviewForUserAsync_ShouldReturnReviews()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" };
            var reviews = new List<Review>
            {
                new() { Id = ObjectId.GenerateNewId(), Rating = 5, Comment = "Famous!" },
                new() { Id = ObjectId.GenerateNewId(), Rating = 0, Comment = "Help me!" },
                new() { Id = ObjectId.GenerateNewId(), Rating = 3, Comment = "It's fine!" }
            };
            _mockUserRepository.Setup(repo => repo.GetReviewForUserAsync(user.Id)).ReturnsAsync(reviews);

            // Act
            List<Review> result = (await _userService.GetReviewForUserAsync(user.Id)).ToList();
            
            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Count());
            _mockUserRepository.Verify(repo => repo.GetReviewForUserAsync(user.Id), Times.Once);
        }

        [TestMethod]
        public async Task UpdateReviewForUserAsync_ShouldCallRepositoryUpdateReviewForUserAsync()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" };
            var review = new Review { Id = ObjectId.GenerateNewId(), Rating = 5, Comment = "Famous!" };
            _mockUserRepository.Setup(repo => repo.UpdateReviewForUserAsync(user.Id, review));

            // Act
            await _userService.UpdateReviewForUserAsync(user.Id, review);

            // Assert
            _mockUserRepository.Verify(repo => repo.UpdateReviewForUserAsync(user.Id, review), Times.Once);
        }

        [TestMethod]
        public async Task DeleteReviewForUserAsync_ShouldCallRepositoryDeleteReviewForUserAsync()
        {
            // Arrange
            var user = new User { Id = ObjectId.GenerateNewId(), Firstname = "John", Lastname = "Doe" };
            var review = new Review { Id = ObjectId.GenerateNewId(), Rating = 5, Comment = "Famous!" };
            _mockUserRepository.Setup(repo => repo.DeleteReviewForUserAsync(user.Id,review.Id)).Returns(Task.CompletedTask);

            // Act
            await _userService.DeleteReviewForUserAsync(user.Id, review.Id);

            // Assert
            _mockUserRepository.Verify(repo => repo.DeleteReviewForUserAsync(user.Id, review.Id), Times.Once);
        }
    }
}

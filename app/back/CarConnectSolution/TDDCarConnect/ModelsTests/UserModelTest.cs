using MongoDB.Bson;
using UserMicroservice.Models;
using UserMicroservice.Models.Enums;

namespace TDDCarConnect.ModelsTests;

[TestClass]
public class UserModelTest
{
    [TestMethod]
    public void User_ShouldInitializeWithDefaultValues()
    {
        var user = new User
        {
            Id = new ObjectId("507f191e810c19729de860ea"),
            CreatedBy = new ObjectId("507f191e810c19729de860eb"),
            Firstname = "John",
            Lastname = "Doe",
            Email = "johndoe@example.com",
            Password = "P@$$w0rd123",
            Birthdate = new DateOnly(1990, 5, 15),
            Gender = Gender.Male,
            Age = 35,
            Address = "123 Main St",
            Role = RoleStatus.user,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow.AddMinutes(1),
        };

        // Act & Assert
        // Values begining verification
        Assert.AreEqual(new ObjectId("507f191e810c19729de860ea"), user.Id);
        Assert.AreEqual(new ObjectId("507f191e810c19729de860eb"), user.CreatedBy);
        Assert.AreEqual("John", user.Firstname);
        Assert.AreEqual("Doe", user.Lastname);
        Assert.AreEqual("johndoe@example.com", user.Email);
        Assert.AreEqual("P@$$w0rd123", user.Password);
        Assert.AreEqual(new DateOnly(1990,5,15), user.Birthdate);
        Assert.AreEqual(Gender.Male, user.Gender);
        Assert.AreEqual(35, user.Age);
        Assert.AreEqual("123 Main St", user.Address);
        Assert.AreEqual(RoleStatus.user, user.Role);

        // Fullname Verification
        Assert.AreEqual("John + Doe", user.FullName);

        //Differnce bitween Create and Update
        var diffInMin = (user.UpdatedAt -  user.CreatedAt).TotalMinutes;
        Assert.IsTrue(Math.Abs(diffInMin -1 ) < 0.01);
    }

    [TestMethod]
    public void User_vehicleUser_ShouldInitializeAsEmptyList()
    {
        // Arrange
        var user = new User();

        // Act & Assert
        Assert.AreEqual(0, user.VehicleUser.Count, "La liste VehicleUser devrait être vide par défaut.");
    }

    [TestMethod]
    public void User_Reviews_ShouldInitializeAsEmptyList()
    {
        // Arrange
        var user = new User();

        Assert.AreEqual(0, user.Reviews.Count, "La liste Reviews devrait être vide par défaut.");
    }

    [TestMethod]
    public void User_CreateAt_ShouldBeValid()
    {
        // Arrange
        var user = new User
        {
            CreatedAt = DateTime.UtcNow
        };

        // Act & Assert
        Assert.IsTrue(user.CreatedAt <= DateTime.UtcNow, "La liste Reviews devrait être vide par défaut.");
    }

    [TestMethod]
    public void User_UpdateAt_shouldBeLaterThanCreatedAt()
    {
        // Arrange
        var user = new User
        {
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow.AddMinutes(1)
        };

        // Act & Assart
        Assert.IsTrue(user.UpdatedAt > user.CreatedAt, "UpdatedAt doit être plus tard que CreatedAt.");
    }
}

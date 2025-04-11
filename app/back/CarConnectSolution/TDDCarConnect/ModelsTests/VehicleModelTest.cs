using MongoDB.Bson;
using UserMicroservice.Models;

namespace TDDCarConnect.ModelsTests;

[TestClass]
public class VehicleModelTest
{
    [TestMethod]
    public void Vehicle_SetValues_ShouldAssignCorrectly_WithOneMinuteDiffecence()
    {
        // Arrange
        var vehicle = new Vehicle
        {
            Id = new ObjectId("507f191e810c19729de860ea"),
            Brand = "Tesla",
            Model = "Model S",
            Capacity = 4,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now.AddMinutes(1),
        };

        //Act & Assert 
        Assert.AreEqual(new ObjectId("507f191e810c19729de860ea"), vehicle.Id);
        Assert.AreEqual("Tesla", vehicle.Brand);
        Assert.AreEqual("Model S", vehicle.Model);
        Assert.AreEqual(4, vehicle.Capacity);

        var diffInMin = (vehicle.UpdatedAt - vehicle.CreatedAt).TotalMinutes;
        Assert.IsTrue(Math.Abs(diffInMin - 1) < 0.01);
    }
}

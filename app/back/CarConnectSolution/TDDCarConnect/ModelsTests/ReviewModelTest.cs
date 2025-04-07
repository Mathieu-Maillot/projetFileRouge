using Microsoft.VisualStudio.TestTools.UnitTesting;
using MongoDB.Bson;
using UserMicroservice.Models;

namespace TDDCarConnect.ModelsTests
{
    [TestClass]
    public sealed class ReviewModelTest
    {
        [TestMethod]
        public void Review_DefaultValues_ShouldBeInitializedCorrectly()
        {
            //Arrange
            var review = new Review();

            //assert
            Assert.AreEqual(ObjectId.Empty, review.Id); // Objet est vide par défault
            Assert.AreEqual(ObjectId.Empty, review.UserId); // L'ObjectId UserId est vide par défaut
            Assert.AreEqual(0, review.Rating); // La note (Rating) est 0 par défaut 
            Assert.AreEqual(string.Empty, review.Comment); // Le commentaire est une chaîne vide par défaut
            Assert.AreEqual(DateTime.MinValue, review.CreateAd); // DateTime.MinValue par défaut
            Assert.AreEqual(DateTime.MinValue, review.UpdateAd); // DateTime.MinValue par défaut
        }

        [TestMethod]
        public void Review_setValues_ShoulAssignCorrectly()
        {
            var review = new Review
            {
                Id = new ObjectId("507f191e810c19729de860ea"), // Id fictif
                UserId = new ObjectId("507f191e810c19729de860eb"), // UserId fictif
                Rating = 4,
                Comment = "Great driver !",
                CreateAd = DateTime.UtcNow,
                UpdateAd = DateTime.UtcNow.AddMinutes(1),
            };

            // Art & assert
            Assert.AreEqual(new ObjectId("507f191e810c19729de860ea"), review.Id);
            Assert.AreEqual(new ObjectId("507f191e810c19729de860eb"), review.UserId);
            Assert.AreEqual(4, review.Rating);
            Assert.IsTrue((DateTime.UtcNow - review.CreateAd).TotalSeconds < 1); // La différence de temps ne doit pas dépasser 1 seconde
            
            var minDif = (review.UpdateAd - review.CreateAd).TotalMinutes;
            Assert.IsTrue(Math.Abs(minDif -1) < 0.01, "The differency in minutes is {differenceInMinutes}"); // La différence entre UpdateAd et CreateAd doit être d'une minute
        }
    }
}

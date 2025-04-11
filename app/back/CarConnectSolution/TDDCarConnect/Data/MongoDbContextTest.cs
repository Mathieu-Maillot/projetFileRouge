using MongoDB.Bson;
using MongoDB.Driver;
using Moq;
using UserMicroservice.Data;
using UserMicroservice.Models;

namespace TDDCarConnect;

[TestClass]
public class MongoDbContextTest
{
    private Mock<IMongoClient> _mockMongoClient;
    private Mock<IMongoDatabase> _mockDb;
    private Mock<IMongoCollection<User>> _mockCollection;
    private Mock<IFindFluent<User, User>> _mockFindFluent;
    private MongoDbContext _context;

    [TestMethod]
    public void TestInitialize()
    {
        // Simuler la variable d'environnement MONGO_URI
        string testMongoUri = "mongodb://localhost:27017";
        Environment.SetEnvironmentVariable("MONGO_URI", testMongoUri);
        _mockMongoClient = new Mock<IMongoClient>();
        _mockDb = new Mock<IMongoDatabase>();
        _mockCollection = new Mock<IMongoCollection<User>>();
        _mockFindFluent = new Mock<IFindFluent<User, User>>();

        _mockMongoClient.Setup(client => client.GetDatabase(It.IsAny<string>(), It.IsAny<MongoDatabaseSettings>())).Returns(_mockDb.Object);
        _mockDb.Setup(db => db.GetCollection<User>("users", null)).Returns(_mockCollection.Object);

        _mockCollection.Setup(col => col.FindSync(It.IsAny<FilterDefinition<User>>(),
                                                  It.IsAny<FindOptions<User, User>>(),
                                                  It.IsAny<CancellationToken>()))
                       .Returns(Mock.Of<IAsyncCursor<User>>);

        _context = new MongoDbContext(_mockMongoClient.Object);
    }

    [TestMethod]
    public void GetReviewsByUserId_UserExists_ReturnReviews()
    {
        // Arrange
        var user = new User 
        { 
            Id = ObjectId.GenerateNewId(),
            Firstname = "Sarah",
            Reviews = new List<Review>
            {
                new() { Rating = 5, Comment = "Excellent !" },
                new() { Rating = 4, Comment = "Good" }
            } 
        };

        var mockCusor = new Mock<IAsyncCursor<User>>();
        mockCusor.SetupSequence(c => c.MoveNext(It.IsAny<CancellationToken>()))
                 .Returns(true)
                 .Returns(false);
        mockCusor.Setup(c => c.Current).Returns(new List<User> { user });

        var filter = Builders<User>.Filter.Eq(u => u.Firstname, "Sarah");
        _mockCollection.Setup(c => c.FindSync(filter,
                                              It.IsAny<FindOptions<User, User>>(),
                                              It.IsAny<CancellationToken>()))
                       .Returns(mockCusor.Object);

        // Act
        var reviews = _context.GetReviewsByUserId(user.Id);

        // Assert
        Assert.IsNotNull(reviews);
        Assert.AreEqual(2, reviews.Count);
        Assert.AreEqual("Excellent !", reviews[0].Comment);
        Assert.AreEqual("Good", reviews[1].Comment);
    }
}

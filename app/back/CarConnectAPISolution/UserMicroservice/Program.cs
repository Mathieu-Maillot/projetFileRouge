using MongoDB.Bson;
using MongoDB.Driver;
using UserMicroservice.Repositories;
using UserMicroservice.Repositories.Interfaces;
using UserMicroservice.Services;
using UserMicroservice.Services.Interfaces;
using UserMicroService.Data;
using UserMicroService.Models;
using UserMicroService.Repositories;
using UserMicroService.Repositories.Interfaces;
using UserMicroService.Services;
using UserMicroService.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Add MongoDbContext to the container
builder.Services.AddScoped<MongoDbContext>();
// Add  Services and Repositories to the container
builder.Services.AddScoped<IUserRepository<User, ObjectId>, UserRepository>();
builder.Services.AddScoped<IReviewRepository<Review, ObjectId>, ReviewRepository>();
builder.Services.AddScoped<IVehicleRepository<Vehicle, ObjectId>, VehicleRepository>();
builder.Services.AddScoped<IUserService<User,ObjectId>, UserService>();
builder.Services.AddScoped<IReviewService<Review,ObjectId>, ReviewService>();
builder.Services.AddScoped<IVehicleService<Vehicle,ObjectId>, VehicleService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

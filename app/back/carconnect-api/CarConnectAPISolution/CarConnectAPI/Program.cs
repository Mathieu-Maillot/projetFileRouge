using CarConnectAPI.Data;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using CarConnectAPI.Services.Interfaces;
using CarConnectAPI.Services;
using MongoDB.Bson;
using CarConnectAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<MongoDbContext>();
// Add  Services and Repositories to the container
builder.Services.AddScoped<IUserRepository<User, string>, UserRepository>();
builder.Services.AddScoped<IReviewRepository<Review, string>, ReviewRepository>();
builder.Services.AddScoped<IVehicleRepository<Vehicle, string>, VehicleRepository>();
builder.Services.AddScoped<IUserService<User, string>, UserService>();
builder.Services.AddScoped<IReviewService<Review, string>, ReviewService>();
builder.Services.AddScoped<IVehicleService<Vehicle, string>, VehicleService>();




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

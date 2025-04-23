using CarConnectAPI.Data;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using CarConnectAPI.Services.Interfaces;
using CarConnectAPI.Services;
using MongoDB.Bson;
using CarConnectAPI.Repositories;
using CarConnectAPI.Helpers;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.InjectDepencies();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
<<<<<<< HEAD
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173");
                      });
=======
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
                      .AllowAnyHeader()
              .AllowAnyMethod();
    });
>>>>>>> ba2146de386ace55f7737dd6d99eef80f3a4aded
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();


app.MapControllers();

await app.RunAsync();

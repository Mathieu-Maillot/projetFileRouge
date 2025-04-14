using CarConnectAPI.Data;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using CarConnectAPI.Services.Interfaces;
using CarConnectAPI.Services;
using MongoDB.Bson;
using CarConnectAPI.Repositories;
using CarConnectAPI.Helpers;
using System.Text;
using CarConnectAPI.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.InjectDepencies();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173");
                      });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<GlobalExcetionMiddleware>();

app.MapControllers();
app.UseCors(MyAllowSpecificOrigins);

await app.RunAsync();

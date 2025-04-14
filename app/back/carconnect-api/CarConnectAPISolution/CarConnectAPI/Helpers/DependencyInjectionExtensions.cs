using CarConnectAPI.Data;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories.Interfaces;
using CarConnectAPI.Repositories;
using CarConnectAPI.Services.Interfaces;
using CarConnectAPI.Services;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CarConnectAPI.Helpers
{
    public static class DependencyInjectionExtensions
    {
        public static void InjectDepencies(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers()
                            .AddJsonOptions(options =>
                                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            
            builder.AddSwagger();

            builder.Services.AddScoped<MongoDbContext>();

            builder.AddRepositories();

            builder.AddServices();

            builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

            builder.AddAuthentication();
        }

        

        private static void AddSwagger(this WebApplicationBuilder builder)
        {

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.EnableAnnotations();

                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CarConnectAPI", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter your Bearer token in the format **Bearer {token}** to access this API."
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });
        }
        private static void AddRepositories(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IUserRepository<User, string>, UserRepository>();
            builder.Services.AddScoped<IReviewRepository<Review, string>, ReviewRepository>();
            builder.Services.AddScoped<IVehicleRepository<Vehicle, string>, VehicleRepository>();
            builder.Services.AddScoped<IMessageRepository<Message, string>, MessageRepository>();
            builder.Services.AddScoped<IBookingRepository<Booking, string>, BookingRepository>();
            builder.Services.AddScoped<IRideRepository<Ride, string>, RideRepository>();
        }
        private static void AddServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IUserService<User, string>, UserService>();
            builder.Services.AddScoped<IReviewService<Review, string>, ReviewService>();
            builder.Services.AddScoped<IVehicleService<Vehicle, string>, VehicleService>();
            builder.Services.AddScoped<IMessageService<Message, string>, MessageService>();
            builder.Services.AddScoped<IBookingService<Booking, string>, BookingService>();
            builder.Services.AddScoped<IRideService<Ride, string>, RideService>();
        }
        private static void AddAuthentication(this WebApplicationBuilder builder)
        {

            var appSettingsSection = builder.Configuration.GetSection("AppSettings");
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings!.SecretKey!);

            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }
    }
}

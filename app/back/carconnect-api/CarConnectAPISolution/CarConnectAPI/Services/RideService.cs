using CarConnectAPI.Helpers;
using CarConnectAPI.Models;
using CarConnectAPI.Repositories;
using CarConnectAPI.Repositories.Interfaces;
using CarConnectAPI.Services.Interfaces;

namespace CarConnectAPI.Services
{
    public class RideService : IRideService<Ride,string>
    {
        private readonly IRideRepository<Ride, string> _rideRepository;

        public RideService(IRideRepository<Ride, string> rideRipository)
        {
            _rideRepository = rideRipository;
        }

        public async Task<Ride> CreateRideAsync(Ride ride)
        {
            var createdRide = await _rideRepository.CreateRideAsync(ride);
            return createdRide ? ride : null!;
        }

        public async Task<List<Ride>> GetAllRidesAsync()
        {
            return await _rideRepository.GetAllRideAsync();
        }

        public async Task<Ride> GetRideByIdAsyn(string rideId)
        {
            return await _rideRepository.GetRideByIdAsync(rideId);
        }

        public async Task<bool> UpdateRideAsync(string rideId, Ride ride)
        {
            return await _rideRepository.UpdateAsync(rideId, ride);
        }

        public async Task<bool> DeleteRideAsync(string rideId)
        {
            return await _rideRepository.DeleteAsync(rideId);
        }

        public async Task<IEnumerable<Ride>> GetRidesByDriverIdAsync(string driverId)
        {
            return await _rideRepository.GetRideByDriverIdAsync(driverId);
        }

        public async Task<IEnumerable<Ride>> SearchRidesAsync(string departure, string arrival, DateTime? date)
        {
            return await _rideRepository.SearchRidesAsync(departure, arrival, date);
        }
    }
}

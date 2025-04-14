import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTrajectStore = create(
	persist(
		(set, get) => ({
			rides: [],
			bookings: [],
			currentRide: null,
			loading: false,
			error: null,

			setRides: (rides) => set({ rides }),
			setBookings: (bookings) => set({ bookings }),
			setCurrentRide: (ride) => set({ currentRide: ride }),
			setLoading: (status) => set({ loading: status }),
			setError: (error) => set({ error }),

			publishTraject: (trajectData) => {
				const newRides = [...get().rides];

				const newTraject = {
					id: crypto.randomUUID(),
					...trajectData,
					createdAt: { "$date": new Date().toISOString() },
					updatedAt: { "$date": new Date().toISOString() }
				};

				newRides.push(newTraject);
				set({ rides: newRides });
				return newTraject;
			},

			deleteTraject: (trajectId) => {
				const filteredRides = get().rides.filter(
					ride => ride.id !== trajectId
				);

				const filteredBookings = get().bookings.filter(
					booking => booking.rideId !== trajectId
				);

				set({
					rides: filteredRides,
					bookings: filteredBookings
				});

				return true;
			},

			updateTraject: (trajectId, updateData) => {
				const updatedRides = get().rides.map(ride => {
					if (ride.id === trajectId) {
						return {
							...ride,
							...updateData,
							updatedAt: { "$date": new Date().toISOString() }
						};
					}
					return ride;
				});

				set({ rides: updatedRides });

				return updatedRides.find(ride => ride.id === trajectId);
			},

			bookTraject: (bookingData) => {
				const newBooking = {
					id: crypto.randomUUID(),
					...bookingData,
					status: "confirmed",
					createdAt: { "$date": new Date().toISOString() },
					updatedAt: { "$date": new Date().toISOString() }
				};

				const updatedBookings = [...get().bookings, newBooking];

				// Update ride available seats
				const updatedRides = get().rides.map(ride => {
					if (ride.id === bookingData.rideId) {
						return {
							...ride,
							availableSeats: ride.availableSeats - (bookingData.seats || 1),
							updatedAt: { "$date": new Date().toISOString() }
						};
					}
					return ride;
				});

				set({
					bookings: updatedBookings,
					rides: updatedRides
				});

				return newBooking;
			},

			cancelBooking: (bookingId) => {
				const bookingIndex = get().bookings.findIndex(
					booking => booking.id === bookingId
				);

				if (bookingIndex === -1) {
					return false;
				}

				const booking = get().bookings[bookingIndex];
				const updatedBooking = {
					...booking,
					status: "cancelled",
					updatedAt: { "$date": new Date().toISOString() }
				};

				const updatedBookings = [...get().bookings];
				updatedBookings[bookingIndex] = updatedBooking;

				const updatedRides = get().rides.map(ride => {
					if (ride.id === booking.rideId) {
						return {
							...ride,
							availableSeats: ride.availableSeats + (booking.seats || 1),
							updatedAt: { "$date": new Date().toISOString() }
						};
					}
					return ride;
				});

				set({
					bookings: updatedBookings,
					rides: updatedRides
				});

				return true;
			},

			getUserTrajects: (userId) => {
				return get().rides.filter(ride => ride.driverId === userId);
			},

			getUserBookings: (userId) => {
				return get().bookings.filter(booking => booking.userId === userId);
			},

			getRideBookings: (rideId) => {
				return get().bookings.filter(booking => booking.rideId === rideId);
			},

			clearData: () => {
				set({
					rides: [],
					bookings: [],
					currentRide: null,
					loading: false,
					error: null
				});
			}
		}),
		{
			name: "traject-storage",
		}
	)
);

export default useTrajectStore;
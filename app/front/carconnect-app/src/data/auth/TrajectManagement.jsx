import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../cfg/store/AuthStore'

const TrajectManagement = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, errorPop, successPop, setData } = useAuthStore();

    const handlePublishTraject = async (data) => {
        if (user?.role !== 'driver' && isAuthenticated) {
            navigate('/auth/driver', { replace: true });
            return;
        }
        if (!isAuthenticated) {
            navigate('/auth/login', { replace: true });
            return;
        }

        try {
            const newTraject = {
                _id: { "$oid": crypto.randomUUID() },
                departureLocation: data.departureLocation,
                arrivalLocation: data.arrivalLocation,
                departureTime: { "$date": data.departureTime || new Date().toISOString() },
                driverId: { "$oid": user._id.$oid || user._id },
                availableSeats: data.availableSeats || 1,
                createdAt: { "$date": new Date().toISOString() },
                updatedAt: { "$date": new Date().toISOString() }
            };
            console.log("New traject published:", newTraject);
            
            let existingData = JSON.parse(localStorage.getItem('app-storage') || '{}');
            
            if (!existingData.state) {
                existingData.state = {};
            }
            
            if (!existingData.state.data) {
                existingData.state.data = {};
            }
            
            if (!existingData.state.data.rides) {
                existingData.state.data.rides = [];
            }
            
            existingData.state.data.rides = [...existingData.state.data.rides, newTraject];
            localStorage.setItem('app-storage', JSON.stringify(existingData));
            
            // Also update the Zustand store
            setData({...existingData.state.data});
            
            navigate('/account/rides', { replace: true });
        } catch (error) {
            console.error("Error publishing traject:", error);
        }
    }

    const handleDeleteTraject = async (trajectId) => {
        if (!isAuthenticated) {
            navigate('/auth/login', { replace: true });
            return false;
        }

        try {
            console.log("Attempting to delete trajectory with ID:", trajectId);
            
            let storage = localStorage.getItem('app-storage');
            console.log("Raw storage data:", storage);
            
            let existingData = JSON.parse(storage || '{}');
            console.log("Parsed storage data:", existingData);
            
            // Initialize the structure if it doesn't exist
            if (!existingData.state) {
                existingData.state = {};
            }
            
            if (!existingData.state.data) {
                existingData.state.data = {};
            }
            
            if (!existingData.state.data.rides) {
                console.log("Initializing rides array");
                existingData.state.data.rides = [];
                localStorage.setItem('app-storage', JSON.stringify(existingData));
                return false; // Nothing to delete
            }
            
            const trajectIndex = existingData.state.data.rides.findIndex(
                ride => ride._id.$oid === trajectId
            );
            
            console.log("Found trajectory at index:", trajectIndex);
            
            if (trajectIndex !== -1) {
                const traject = existingData.state.data.rides[trajectIndex];
                
                const isOwner = traject.driverId.$oid === (user._id.$oid || user._id);
                const isAdmin = user.role === 'admin';
                
                console.log("Is user the owner?", isOwner);
                console.log("Is user admin?", isAdmin);
                
                if (!isOwner && !isAdmin) {
                    console.error("Unauthorized: You are not the driver of this ride");
                    return false;
                }
                
                existingData.state.data.rides.splice(trajectIndex, 1);
                
                if (!existingData.state.data.bookings) {
                    existingData.state.data.bookings = [];
                } else {
                    existingData.state.data.bookings = existingData.state.data.bookings.filter(
                        booking => booking.rideId.$oid !== trajectId
                    );
                }
                
                localStorage.setItem('app-storage', JSON.stringify(existingData));
                
                // Also update the Zustand store
                setData({...existingData.state.data});
                
                console.log("Trajectory deleted successfully");
                
                return true;
            } else {
                console.error("Trajectory not found");
                return false;
            }
        } catch (error) {
            console.error("Error deleting trajectory:", error);
            return false;
        }
    }

    return {
        handlePublishTraject,
        handleDeleteTraject
    }
}

export default TrajectManagement
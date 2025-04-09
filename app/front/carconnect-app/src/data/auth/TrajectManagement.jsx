import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../cfg/store/AuthStore'

const TrajectManagement = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, setData, errorPop, successPop } = useAuthStore();

    const handlePublishTraject = async (data) => {
        if (!isAuthenticated) {
            errorPop("Vous devez vous connecter pour publier un trajet");
            navigate('/auth/login', { replace: true });
            return;
        }
        
        if (user?.role !== 'driver' && isAuthenticated) {
            errorPop("Vous devez être conducteur pour publier un trajet");
            navigate('/auth/driver', { replace: true });
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
            
            setData({...existingData.state.data});
            successPop("Votre trajet a été publié avec succès");
            navigate('/routes/publish/traject', { replace: true });
        } catch (error) {
            console.error("Error publishing traject:", error);
            errorPop("Une erreur est survenue lors de la publication du trajet");
        }
    }

    const handleDeleteTraject = async (trajectId) => {
        if (!isAuthenticated) {
            errorPop("Vous devez vous connecter pour effectuer cette action");
            navigate('/auth/login', { replace: true });
            return false;
        }

        try {
            console.log("Attempting to delete trajectory with ID:", trajectId);
            
            let storage = localStorage.getItem('app-storage');
            let existingData = JSON.parse(storage || '{}');
            
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
                errorPop("Aucun trajet trouvé");
                return false; // Nothing to delete
            }
            
            const trajectIndex = existingData.state.data.rides.findIndex(
                ride => ride._id.$oid === trajectId
            );
            
            if (trajectIndex !== -1) {
                const traject = existingData.state.data.rides[trajectIndex];
                
                const isOwner = traject.driverId.$oid === (user._id.$oid || user._id);
                const isAdmin = user.role === 'admin';
                
                if (!isOwner && !isAdmin) {
                    errorPop("Vous n'êtes pas autorisé à supprimer ce trajet");
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
                setData({...existingData.state.data});
                successPop("Trajet supprimé avec succès");
                
                return true;
            } else {
                errorPop("Trajet introuvable");
                return false;
            }
        } catch (error) {
            console.error("Error deleting trajectory:", error);
            errorPop("Une erreur est survenue lors de la suppression du trajet");
            return false;
        }
    }

    return {
        handlePublishTraject,
        handleDeleteTraject
    }
}

export default TrajectManagement
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../cfg/store/AuthStore'
import axios from 'axios';

const TrajectManagement = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, setData, errorPop, successPop } = useAuthStore();

    
    axios.defaults.httpsAgent = {
        rejectUnauthorized: false 
    };

    const handleSearch = async (formData) => {
        try {
            const response = await axios.get("https://localhost:7228/api/Ride", {
                validateStatus: false,
                timeout: 5000 
            });
            const data = response.data;
            console.log("Rides fetched:", data);
            return data;
        }
        catch (err) {
            console.error("Error fetching rides:", err);
            errorPop && errorPop("Erreur lors de la récupération des trajets");
            return null;
        }
    }

    const handlePublishTraject = async (data) => {
        console.log("Publication data:", data);
        
        if (!isAuthenticated) {
            errorPop && errorPop("Vous devez vous connecter pour publier un trajet");
            navigate('/auth/login', { replace: true });
            return;
        }

        if (user?.role !== 'driver' && isAuthenticated) {
            errorPop && errorPop("Vous devez être conducteur pour publier un trajet");
            navigate('/auth/driver', { replace: true });
            return;
        }

        try {
            if (!data.departureLocation || !data.arrivalLocation || !data.departureTime) {
                errorPop && errorPop("Des informations essentielles sont manquantes");
                return;
            }

            const departureTime = typeof data.departureTime === 'string' ? 
                data.departureTime : data.departureTime instanceof Date ? 
                    data.departureTime.toISOString() : new Date().toISOString();

            const arrivalTime = typeof data.arrivalTime === 'string' ? 
                data.arrivalTime : data.arrivalTime instanceof Date ? 
                    data.arrivalTime.toISOString() : new Date(new Date(departureTime).getTime() + 2*60*60*1000 + 15*60*1000).toISOString();

            const trajectId = crypto.randomUUID();
            
            const rideData = {
                id: trajectId,
                departureLocation: data.departureLocation,
                arrivalLocation: data.arrivalLocation,
                departureTime: departureTime,
                arrivalTime: arrivalTime,
                driverId: user.id,
                availableSeats: data.availableSeats || 1,
                createAt: new Date().toISOString(),
                updateAt: new Date().toISOString(),
                price: data.price || 0,
                description: data.description || "",
                noSmoking: data.nonSmoking !== undefined ? data.nonSmoking : true,
                petsAllowed: data.petsAllowed !== undefined ? data.petsAllowed : false,
                passengers: []
            };

            console.log("Sending ride data:", rideData);
            let apiSuccess = false;

            try {
                const response = await axios.post(
                    "https://localhost:7228/api/Ride", 
                    rideData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        timeout: 5000,
                        validateStatus: false 
                    }
                );
                
                if (response.status >= 200 && response.status < 300) {
                    console.log("API response success:", response.data);
                    apiSuccess = true;
                } else {
                    console.warn("API returned status:", response.status);
                }
            } catch (apiError) {
                console.error("API error:", apiError);
                console.log("Continuing with local storage only");
            }

            const localTraject = {
                id: trajectId,
                departureLocation: data.departureLocation,
                arrivalLocation: data.arrivalLocation,
                departureTime: { "$date": departureTime },
                arrivalTime: { "$date": arrivalTime },
                driverId: user.id,
                availableSeats: data.availableSeats || 1,
                price: data.price || 0,
                vehicle: data.vehicle || "",
                description: data.description || "",
                nonSmoking: data.nonSmoking !== undefined ? data.nonSmoking : true,
                petsAllowed: data.petsAllowed !== undefined ? data.petsAllowed : false,
                createdAt: { "$date": new Date().toISOString() },
                updatedAt: { "$date": new Date().toISOString() }
            };

            let existingData = JSON.parse(localStorage.getItem('app-storage') || '{}');
            if (!existingData.state) existingData.state = {};
            if (!existingData.state.data) existingData.state.data = {};
            if (!existingData.state.data.rides) existingData.state.data.rides = [];

            existingData.state.data.rides.push(localTraject);
            localStorage.setItem('app-storage', JSON.stringify(existingData));
            setData({ ...existingData.state.data });
            
            if (apiSuccess) {
                successPop && successPop("Votre trajet a été publié avec succès");
            } else {
                successPop && successPop("Trajet enregistré localement (mode hors ligne)");
            }
            
            navigate('/rides', { replace: true });
        } catch (error) {
            console.error("Error publishing traject:", error);
            errorPop && errorPop("Une erreur est survenue lors de la publication du trajet");
        }
    }

    const handleDeleteTraject = async (trajectId) => {
        if (!isAuthenticated) {
            errorPop && errorPop("Vous devez vous connecter pour effectuer cette action");
            navigate('/auth/login', { replace: true });
            return false;
        }

        try {
            try {
                const response = await axios.delete(`https://localhost:7228/api/Ride/${trajectId}`, {
                    timeout: 5000,
                    validateStatus: false
                });
                
                if (response.status >= 200 && response.status < 300) {
                    console.log("Ride successfully deleted from API");
                } else {
                    console.warn("API delete returned status:", response.status);
                }
            } catch (apiError) {
                console.error("API delete error:", apiError);
                console.log("Continuing with local storage delete only");
            }

            let storage = localStorage.getItem('app-storage');
            let existingData = JSON.parse(storage || '{}');

            if (!existingData.state?.data?.rides) {
                errorPop && errorPop("Aucun trajet trouvé");
                return false;
            }

            const trajectIndex = existingData.state.data.rides.findIndex(ride => ride.id === trajectId);

            if (trajectIndex !== -1) {
                const traject = existingData.state.data.rides[trajectIndex];
                
                // Vérification des permissions
                if (traject.driverId !== user.id && user.role !== 'admin') {
                    errorPop && errorPop("Vous n'êtes pas autorisé à supprimer ce trajet");
                    return false;
                }

                // Suppression du trajet
                existingData.state.data.rides.splice(trajectIndex, 1);
                
                // Suppression des réservations associées
                if (existingData.state.data.bookings) {
                    existingData.state.data.bookings = existingData.state.data.bookings.filter(
                        booking => booking.rideId !== trajectId
                    );
                }

                localStorage.setItem('app-storage', JSON.stringify(existingData));
                setData({ ...existingData.state.data });
                successPop && successPop("Trajet supprimé avec succès");
                return true;
            } else {
                errorPop && errorPop("Trajet introuvable");
                return false;
            }
        } catch (error) {
            console.error("Error deleting trajectory:", error);
            errorPop && errorPop("Une erreur est survenue lors de la suppression du trajet");
            return false;
        }
    }

    return {
        handlePublishTraject,
        handleDeleteTraject,
        handleSearch
    }
}

export default TrajectManagement
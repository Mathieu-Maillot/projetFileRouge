import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { calculateTimeBetween, getFormattedDate, getFormattedTime } from '../../../../components/utils/DataHelpers';
import DriverView from './DriverView';
import PassengerView from './PassengerView';
import { linkBookingsForUser } from '../../../../components/utils/DataHelpers';
import useStore, { useAuthStore } from '../../../../../cfg/store/AuthStore';
import Button from '../../../../components/helpers/Button';

const DetailsTraject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useStore();
    const [ride, setRide] = useState(null);
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isLogged = useAuthStore(state => state.isAuthenticated);
    const { errorPop } = useAuthStore();    
    
    useEffect(() => {
        const fetchRideDetails = async () => {
            setLoading(true);
            
            try {
                const response = await axios.get(`https://localhost:7228/api/Ride/${id}`, {
                    httpsAgent: { rejectUnauthorized: false }
                });
                
                console.log("Ride data from API:", response.data);
                setRide(response.data);
                
                if (response.data.driverId) {
                    try {
                        const driverResponse = await axios.get(`https://localhost:7228/api/User/${response.data.driverId}`, {
                            httpsAgent: { rejectUnauthorized: false }
                        });
                        console.log("Driver data from API:", driverResponse.data);
                        setDriver(driverResponse.data);
                    } catch (driverError) {
                        console.error("Error fetching driver:", driverError);
                        setDriver({
                            id: response.data.driverId,
                            firstname: "Conducteur",
                            lastname: "Inconnu"
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching ride details:", error);
                
                const storage = localStorage.getItem('app-storage');
                if (storage) {
                    const data = JSON.parse(storage);
                    if (data.state?.data?.rides) {
                        const localRide = data.state.data.rides.find(r => r.id === id);
                        if (localRide) {
                            setRide(localRide);
                            
                            if (data.state?.data?.users) {
                                const localDriver = data.state.data.users.find(u => u.id === localRide.driverId);
                                if (localDriver) {
                                    setDriver(localDriver);
                                }
                            }
                        } else {
                            setError("Trajet non trouvé");
                            errorPop && errorPop("Trajet non trouvé");
                        }
                    }
                } else {
                    setError("Erreur lors du chargement des données");
                    errorPop && errorPop("Erreur lors du chargement des données");
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchRideDetails();
    }, [id, errorPop]);
    
    const isDriver = user?.id === ride?.driverId;
    
    const tripDuration = ride ? calculateTimeBetween(
        ride.departureTime?.$date || ride.departureTime,
        ride.arrivalTime?.$date || ride.arrivalTime
    ) : "Durée inconnue";
    
    const userBookings = linkBookingsForUser(user, { rides: [ride].filter(Boolean), bookings: [] });
    const currentRideBooking = userBookings?.find(
        booking => booking.ride.id === id && booking.passenger.id === user?.id
    );
    const isPassengerForThisRide = !!currentRideBooking;
    const bookingStatus = currentRideBooking?.booking?.status;
    
    const checkUser = () => {
        if (isDriver) {
            return (
                <>
                    <h3>Votre trajet n'attend que vous</h3>
                </>
            )
        } else {
            return (
                <>
                    <div className="element">
                        <h3 className='bold'>Cette réservation</h3>
                    </div>
                    <div className="element">
                        <p>{ride?.departureLocation} {'->'} {ride?.arrivalLocation}</p>
                    </div>
                    <div className="element">
                        <p>Temps de trajet : {tripDuration}</p>
                    </div>
                    <div className="element">
                        <p>Avec : {driver?.firstName || driver?.firstname} {driver?.lastName || driver?.lastname}</p>
                    </div>
                    <div className="element">
                        <p>Prix : {ride?.price} €</p>
                    </div>
                    <div className="element">
                        {isPassengerForThisRide && bookingStatus === "confirmed" ? (
                            <Button variant='primary' onClick={() => alert("Cette fonctionnalité n'est pas encore disponible")}>
                                Annuler la réservation
                            </Button>
                        ) : (
                            <Button variant='primary' onClick={() => alert("Cette fonctionnalité n'est pas encore disponible")}>
                                Demande de réservation
                            </Button>
                        )}
                    </div>
                </>
            );
        }
    };
    
    // Gérer les états de chargement et d'erreur
    if (loading) {
        return (
            <section id="details_traject">
                <div className="container">
                    <div className="loading-message">
                        <p>Chargement des détails du trajet...</p>
                    </div>
                </div>
            </section>
        );
    }
    
    if (error || !ride) {
        return (
            <section id="details_traject">
                <div className="container">
                    <div className="error-message">
                        <h3>Erreur lors du chargement du trajet</h3>
                        <p>{error || "Trajet non trouvé"}</p>
                        <Button variant='primary' onClick={() => navigate('/routes/search')}>
                            Retour à la recherche
                        </Button>
                    </div>
                </div>
            </section>
        );
    }
    
    // Fonction pour obtenir la valeur de date (gère les deux formats)
    const getDateValue = (dateObj) => {
        if (dateObj && dateObj.$date) {
            return dateObj.$date;
        }
        return dateObj;
    };
    
    return (
        <section id="details_traject">
            <div className="container">
                <div className="flex column gap2">
                    <div className="element">
                        <h2 className='bold lh03'>
                            {getFormattedDate(getDateValue(ride.departureTime))}
                        </h2>
                    </div>
                    <div className="container_whole">
                        <div className="container_content">
                            <div className="element_box">
                                <div className="element">
                                    <h3 className='bold'>Trajet</h3>
                                </div>
                                <div className="container_between w_100">
                                    <div className="wrapper_departure">
                                        <p>{ride.departureLocation}</p>
                                        <p className='text_color02'>
                                            {getFormattedTime(getDateValue(ride.departureTime))}
                                        </p>
                                    </div>
                                    <div className="wrapper_line">
                                        <div className="line">
                                            <div className="circle start"></div>
                                            <div className="dash-line"></div>
                                            <div className="circle end"></div>
                                        </div>
                                    </div>
                                    <div className="wrapper_arrival">
                                        <p>{ride.arrivalLocation}</p>
                                        <p className='text_color02'>
                                            {getFormattedTime(getDateValue(ride.arrivalTime))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="element_box">
                                <div className="container">
                                    <div className="flex column gap2">
                                        {isDriver ? (
                                            <DriverView data={{ rides: [ride], users: driver ? [driver] : [] }} ride={ride} />
                                        ) : (
                                            <PassengerView data={{ rides: [ride], users: driver ? [driver] : [] }} user={user} ride={ride} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container_details w_100">
                            <div className="element_box">
                                {checkUser()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .loading-message, .error-message {
                    text-align: center;
                    padding: 2rem 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                
                .error-message {
                    color: #f5222d;
                }
            `}</style>
        </section>
    );
};

export default DetailsTraject;
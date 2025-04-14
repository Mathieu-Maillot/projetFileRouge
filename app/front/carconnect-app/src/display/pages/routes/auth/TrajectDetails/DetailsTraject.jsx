import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { calculateTimeBetween, getFormattedDate, getFormattedTime } from '../../../../components/utils/DataHelpers';
import DriverView from './DriverView';
import PassengerView from './PassengerView';
import useStore, { useAuthStore } from '../../../../../cfg/store/AuthStore';
import Button from '../../../../components/helpers/Button';

const DetailsTraject = () => {
    const { id } = useParams();
    const { user } = useStore();
    const [Ride, setRide] = useState(null);
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
	
    useEffect(() => {
        const fetchRide = async () => {
            try {
                const response = await axios.get(`https://localhost:7228/api/Ride/${id}`);
                setRide(response.data);
				console.log(response.data);
                if (response.data.driverId) {
                    const driverResponse = await axios.get(`https://localhost:7228/api/User/${response.data.driverId}`);
                    setDriver(driverResponse.data);
                }
            } catch (err) {
                setError("Erreur lors du chargement du trajet");
            } finally {
                setLoading(false);
            }
        };
        fetchRide();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error || !Ride) return <p>{error || "Trajet non trouvé"}</p>;

    const isDriver = Ride?.driverId === user?.id;
    const tripDuration = Ride ? calculateTimeBetween(Ride?.departureTime, Ride?.arrivalTime) : "Durée inconnue";

    const checkUser = () => {
        if (isDriver) {
            return (
                <>
                    <h3>Votre trajet n'attend que vous</h3>
                </>
            );
        } else {
            return (
                <>
                    <div className="element">
                        <h3 className='bold'>Cette réservation</h3>
                    </div>
                    <div className="element">
                        <p>{Ride?.departureLocation} {'->'} {Ride?.arrivalLocation}</p>
                    </div>
                    <div className="element">
                        <p>Temps de trajet : {tripDuration}</p>
                    </div>
                    <div className="element">
                        <p>Avec : {driver?.firstName || driver?.firstname} {driver?.lastName || driver?.lastname}</p>
                    </div>
                    <div className="element">
                        <p>Prix : {Ride?.price} €</p>
                    </div>
                    <div className="element">
                        <Button variant='primary' onClick={() => alert("Cette fonctionnalité n'est pas encore disponible")}>
                            {isDriver ? "Annuler la réservation" : "Demande de réservation"}
                        </Button>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <section id="details_traject">
                <div className="container">
                    <div className="flex column gap2">
                        <div className="element">
                            <h2 className='bold lh03'>{getFormattedDate(Ride?.departureTime)}</h2>
                        </div>
                        <div className="container_whole">
                            <div className="container_content">
                                <div className="element_box">
                                    <div className="element">
                                        <h3 className='bold'>Trajet</h3>
                                    </div>
                                    <div className="container_between w_100">
                                        <div className="wrapper_departure">
                                            <p>{Ride?.departureLocation}</p>
                                            <p className='text_color02'>{getFormattedTime(Ride?.departureTime)}</p>
                                        </div>
                                        <div className="wrapper_line">
                                            <div className="line">
                                                <div className="circle start"></div>
                                                <div className="dash-line"></div>
                                                <div className="circle end"></div>
                                            </div>
                                        </div>
                                        <div className="wrapper_arrival">
                                            <p>{Ride?.arrivalLocation}</p>
                                            <p className='text_color02'>{getFormattedTime(Ride?.arrivalTime)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="element_box">
                                    <div className="container">
                                        <div className="flex column gap2">
                                            {isDriver ? (
                                                <DriverView ride={Ride} />
                                            ) : (
                                                <PassengerView user={user} ride={Ride} />
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
            </section>
        </>
    );
};

export default DetailsTraject;
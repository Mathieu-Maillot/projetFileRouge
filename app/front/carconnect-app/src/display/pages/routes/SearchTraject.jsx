import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/utils/Form';
import Icon from '../../components/utils/Icon';
import Dropdown from '../../components/utils/Dropdown';
import { getFormattedDate, getFormattedTime } from '../../components/utils/DataHelpers';
import FormSearch from '../../components/utils/FormSearch';
import { useAuthStore } from '../../../cfg/store/AuthStore';
import TrajectManagement from '../../../data/auth/TrajectManagement';
import axios from 'axios';

const SearchTraject = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);
    const [nbrPassenger, setNbrPassenger] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [searchDebug, setSearchDebug] = useState({});
    const [selectedDate, setSelectedDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allRides, setAllRides] = useState([]);
    const { handleSearch } = TrajectManagement();
    const { errorPop } = useAuthStore();
    
    useEffect(() => {
        const checkIfMobile = () => {
            const mediaQuery = window.matchMedia(`(max-width: 768px)`);
            setIsMobile(mediaQuery.matches);
        };

        checkIfMobile();

        const mediaQuery = window.matchMedia(`(max-width: 768px)`);
        mediaQuery.addEventListener('change', checkIfMobile);

        // Charger les trajets lors du montage du composant
        fetchRides();

        return () => mediaQuery.removeEventListener('change', checkIfMobile);
    }, []);

    const fetchRides = async () => {
        setIsLoading(true);
        setError(null);
        try {
            try {
                const response = await axios.get("https://localhost:7228/api/Ride", {
                    timeout: 5000,
                    validateStatus: false,
                    httpsAgent: {
                        rejectUnauthorized: false
                    }
                });
                
                if (response.status >= 200 && response.status < 300) {
                    console.log("Rides successfully fetched from API:", response.data);
                    setAllRides(response.data);
                    return;
                } else {
                    console.warn("API returned non-success status:", response.status);
                    throw new Error(`API error: ${response.status}`);
                }
            } catch (apiError) {
                console.error("API fetch error:", apiError);
                
                console.log("Falling back to local storage");
                const storage = localStorage.getItem('app-storage');
                if (storage) {
                    const data = JSON.parse(storage);
                    if (data.state?.data?.rides) {
                        console.log("Rides retrieved from local storage:", data.state.data.rides);
                        setAllRides(data.state.data.rides);
                        return;
                    }
                }
                
                throw new Error("Aucun trajet trouvé dans le stockage local");
            }
        } catch (err) {
            console.error("Error fetching rides:", err);
            setError(err.message);
            errorPop && errorPop("Erreur lors de la récupération des trajets");
        } finally {
            setIsLoading(false);
        }
    };

    const refreshRides = () => {
        fetchRides();
    };

    const normalizeDate = (dateString) => {
        if (!dateString) return null;

        try {
            let date;
            if (typeof dateString === 'object' && dateString.$date) {
                date = new Date(dateString.$date);
            } else {
                date = new Date(dateString);
            }
            
            if (isNaN(date.getTime())) {
                console.error("Invalid date:", dateString);
                return null;
            }
            
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        } catch (error) {
            console.error("Error normalizing date:", error);
            return null;
        }
    };

    const handleDateChange = (value) => {
        console.log("Date selected:", value);
        setSelectedDate(value);
    };

    const handleSearchTraject = (formData) => {
        console.log("Raw form data:", formData);
        setSearchDebug(formData);

        const departureLocation = formData.depart;
        const arrivalLocation = formData.arrival;
        const rawDate = formData.date || selectedDate;
        const searchDate = rawDate ? normalizeDate(rawDate) : null;

        console.log("Search criteria:", {
            departureLocation,
            arrivalLocation,
            rawDate,
            searchDate,
            nbrPassenger
        });

        let filteredRides = [...allRides];
        console.log("Initial rides count:", filteredRides.length);

        if (departureLocation) {
            filteredRides = filteredRides.filter(ride => {
                const rideDeparture = ride.departureLocation?.toLowerCase();
                return rideDeparture && rideDeparture.includes(departureLocation.toLowerCase());
            });
            console.log("After departure filter:", filteredRides.length);
        }

        if (arrivalLocation) {
            filteredRides = filteredRides.filter(ride => {
                const rideArrival = ride.arrivalLocation?.toLowerCase();
                return rideArrival && rideArrival.includes(arrivalLocation.toLowerCase());
            });
            console.log("After arrival filter:", filteredRides.length);
        }

        if (searchDate) {
            filteredRides = filteredRides.filter(ride => {
                const depTime = ride.departureTime?.$date || ride.departureTime;
                if (!depTime) return false;
                
                const rideDate = normalizeDate(depTime);
                const isMatch = rideDate === searchDate;
                return isMatch;
            });
            console.log("After date filter:", filteredRides.length);
        }

        filteredRides = filteredRides.filter(ride => {
            const seats = parseInt(ride.availableSeats, 10);
            return !isNaN(seats) && seats >= nbrPassenger;
        });
        console.log(`After passenger filter (${nbrPassenger})`, filteredRides.length);

        setSearchResults(filteredRides);
        setSearchPerformed(true);
    };

    const handleButtonForm = () => {
        return (
            <div className="element relative">
                <button
                    type='button'
                    onClick={() => setActiveMenu(!activeMenu)}
                    className='btn btn_form'
                    style={{ minWidth: '12rem', textAlign: 'center' }}
                >
                    {nbrPassenger} {nbrPassenger <= 1 ? "Passager" : "Passagers"}
                </button>
                <Dropdown
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    nbrPassenger={nbrPassenger}
                    setNbrPassenger={setNbrPassenger}
                />
            </div>
        )
    };

    const handleRideClick = (rideId) => {
        navigate(`/rides/${rideId}`);
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const customFormInputs = () => {
        return (
            <>
                <div className="form_element">
                    <input
                        type="date"
                        id="search-date"
                        className='input_default'
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                </div>
            </>
        );
    };

    const getRideDate = (ride, property) => {
        if (!ride) return '';
        const dateValue = ride[property];
        if (typeof dateValue === 'object' && dateValue.$date) {
            return dateValue.$date;
        }
        return dateValue;
    };

    return (
        <section id="search_traject">
            <div className="container">
                {isMobile && (
                    <div className="wrapper">
                        <h1>Recherche et pars à l'aventure!</h1>
                    </div>
                )}
                <div className="wrapper">
                    <FormSearch
                        formAction={handleSearchTraject}
                        inputCount={2}
                        placeholder={['Ville de départ', "Ville d'arrivée"]}
                        inputTypes={['search', 'search']}
                        inputName={['depart', "arrival"]}
                        buttonName="Rechercher"
                        btnClass="btn btn_base"
                        children={
                            <>
                                {customFormInputs()}
                                {handleButtonForm()}
                            </>
                        }
                    />
                </div>

                {isLoading ? (
                    <div className="wrapper">
                        <p>Chargement des trajets...</p>
                    </div>
                ) : error ? (
                    <div className="error-message">
                        <p>Erreur: {error}</p>
                        <button className="btn btn_alt" onClick={refreshRides}>
                            Réessayer
                        </button>
                    </div>
                ) : searchPerformed && (
                    <div className="search-results">
                        <div className="element">
                            <h2>Résultats de recherche ({searchResults.length})</h2>
                            <p className="search-criteria text_color02">
                                {searchDebug.depart ? `De: ${searchDebug.depart}` : ''}
                                {searchDebug.arrival ? ` → ${searchDebug.arrival}` : ''}
                                {selectedDate ? ` | Date: ${formatDateForDisplay(selectedDate)}` : ''}
                                {` | ${nbrPassenger} passager(s)`}
                            </p>
                        </div>
                        {searchResults.length > 0 ? (
                            <div className="flex column gap2">
                                {searchResults.map((ride) => (
                                    <div
                                        key={ride.id}
                                        className="element_box cursor_pointer"
                                        onClick={() => handleRideClick(ride.id)}
                                    >
                                        <div className="container_between w_100">
                                            <h3>{ride.departureLocation} → {ride.arrivalLocation}</h3>
                                            <p className="text_color02">{ride.price} €</p>
                                        </div>
                                        <div className="container_details">
                                            <p>Départ: {getFormattedDate(getRideDate(ride, 'departureTime'))}</p>
                                            <p>Heure: {getFormattedTime(getRideDate(ride, 'departureTime'))}</p>
                                            <p>Places disponibles: {ride.availableSeats}</p>
                                            {ride.noSmoking !== undefined && ride.noSmoking && (
                                                <span className="badge no-smoking">Non-fumeur</span>
                                            )}
                                            {ride.petsAllowed && (
                                                <span className="badge pets-allowed">Animaux autorisés</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="element_box">
                                <p>Aucun trajet trouvé pour ces critères.</p>
                            </div>
                        )}
                    </div>
                )}
                
                <div className="actions-container">
                    <button onClick={refreshRides} className="btn btn_alt refresh-button">
                        <Icon name="refresh" /> Actualiser les trajets
                    </button>
                </div>
            </div>

        </section>
    );
};

export default SearchTraject;
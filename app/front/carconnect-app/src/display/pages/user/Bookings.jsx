import React, { useState } from 'react';
import { getFormattedDate, linkBookingsForUser } from '../../components/utils/DataHelpers';
import Search from '../../components/helpers/Search';

const Bookings = ({ user, data }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const userBookings = linkBookingsForUser(user, data);
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const filteredBookings = userBookings.filter(booking => {
        const searchLower = searchTerm.toLowerCase();
        
        return (
            booking?.ride?.departureLocation?.toLowerCase().includes(searchLower) ||
            booking?.ride?.arrivalLocation?.toLowerCase().includes(searchLower) ||
            booking?.ride?.price?.toString().includes(searchLower) ||
            getFormattedDate(booking?.ride?.departureTime?.$date)?.toLowerCase().includes(searchLower) ||
            booking?.driver?.firstName?.toLowerCase().includes(searchLower) ||
            booking?.driver?.lastName?.toLowerCase().includes(searchLower) ||
            booking?.booking?.status?.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div id="bookings" className="w_100 margin_top08">
            <div className="flex column gap1">
                <h1>Mes réservations</h1>
                <Search 
                    handleSearch={handleSearch} 
                    searchTerm={searchTerm} 
                    placeholder="Rechercher par ville, date, prix ou conducteur..." 
                />
                <div className="flex column gap1 pad1">
                    {filteredBookings?.length ? (
                        filteredBookings.map((booking, index) => (
                            <ul className="element_box" key={index}>
                                <li className="wrapper_ride flex column gap05">
                                    <div className="element">
                                        <p>
                                            {booking?.ride?.departureLocation} - {booking?.ride?.arrivalLocation}
                                        </p>
                                    </div>
                                    <div className="element">
                                        <p>{getFormattedDate(booking?.ride?.departureTime?.$date)}</p>
                                    </div>
                                    <div className="element">
                                        <p>
                                            <strong>Conducteur:</strong> {booking?.driver?.firstName} {booking?.driver?.lastName}
                                        </p>
                                    </div>
                                    <div className="element">
                                        <p>{booking?.ride?.price} € - <span className={`status-${booking?.booking?.status}`}>{booking?.booking?.status}</span></p>
                                    </div>
                                </li>
                            </ul>
                        ))
                    ) : (
                        <p>
                            {userBookings.length > 0 
                                ? "Aucune réservation ne correspond à votre recherche" 
                                : "Aucune réservation trouvée"}
                        </p>
                    )}
                </div>
            </div>

            <style jsx>{`
                .status-confirmed {
                    color: #4CAF50;
                }
                .status-pending {
                    color: #FF9800;
                }
                .status-cancelled {
                    color: #F44336;
                }
            `}</style>
        </div>
    );
};

export default Bookings;
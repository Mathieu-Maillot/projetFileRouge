import React, { useState } from 'react'
import { getFormattedDate } from '../../components/utils/DataHelpers'
import Search from '../../components/helpers/Search'

const Rides = ({ user, data }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const userRides = data?.rides?.filter(ride => ride.driverId?.$oid === user?._id?.$oid) || []
    
    const filteredRides = userRides.filter(ride => {
        const searchLower = searchTerm.toLowerCase()
        
         return (
            ride.departureLocation.toLowerCase().includes(searchLower) ||
            ride.arrivalLocation.toLowerCase().includes(searchLower) ||
            ride.price.toString().includes(searchLower) ||
            getFormattedDate(ride.departureTime?.$date).toLowerCase().includes(searchLower)
        )
    })

    return (
        <div id="rides" className="w_100 margin_top08">
            <div className="flex column gap1">
                <h1>Mes trajets</h1>
                <Search 
                    handleSearch={handleSearch} 
                    searchTerm={searchTerm} 
                    placeholder="Rechercher par ville, date ou prix..." 
                />
                <div className="flex column gap1 pad1">
                    {filteredRides.length > 0 ? (
                        filteredRides.map((ride, index) => (
                            <ul className="element_box" key={index}>
                                <li className="wrapper_ride flex column gap05">
                                    <div className="flex gap1">
                                        <p>{index + 1} :</p>
                                        <p>
                                            {ride?.departureLocation} - {ride?.arrivalLocation}
                                        </p>
                                    </div>
                                    <div className="element">
                                        <p>{getFormattedDate(ride?.departureTime?.$date)}</p>
                                    </div>
                                    <div className="element">
                                        <p>{ride?.price} €</p>
                                    </div>
                                </li>
                            </ul>
                        ))
                    ) : (
                        <p>
                            {userRides.length > 0 
                                ? "Aucun trajet ne correspond à votre recherche" 
                                : "Aucun trajet trouvé"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Rides
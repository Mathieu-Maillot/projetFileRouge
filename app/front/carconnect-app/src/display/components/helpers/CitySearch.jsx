import { useState, useEffect, useRef } from "react";
import axios from "axios";

const CitySearch = ({ onSelectCity, placeholder = "Rechercher une ville...", inputName }) => {
    const [query, setQuery] = useState("");
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (query.length < 2) {
            setCities([]);
            return;
        }

        if (selectedCity && selectedCity.nom === query) {
            return;
        }

        const fetchCities = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://geo.api.gouv.fr/communes`, {
                    params: {
                        nom: query,
                        fields: "nom,code,codesPostaux",
                        boost: "population",
                        limit: 10,
                    },
                });
                setCities(res.data);
                setIsDropdownOpen(true);
            } catch (err) {
                console.error("Erreur lors de la récupération des villes :", err);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(fetchCities, 300); 
        return () => clearTimeout(timeout);
    }, [query, selectedCity]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
                inputRef.current && !inputRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setQuery(city.nom);
        setCities([]);
        setIsDropdownOpen(false);
        
        if (typeof onSelectCity === 'function') {
            onSelectCity(city);
        }
    };

    const handleInputFocus = () => {
        if (query.length >= 2 && (!selectedCity || selectedCity.nom !== query)) {
            setIsDropdownOpen(true);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        
        if (selectedCity && value !== selectedCity.nom) {
            setSelectedCity(null);
        }
    };

    const inputId = inputName || `city-search-${Math.random().toString(36).substring(2, 11)}`;

    return (
        <div className="city_search_container">
            <input
                ref={inputRef}
                type="text"
                id={inputId}
                value={query}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder={placeholder}
                className="input_default"
                name={inputName}
            />
            <label htmlFor={inputId} className="label_default label_focused"></label>
            
            {loading && <p className="city_search_loading">Chargement...</p>}
            {!loading && cities.length > 0 && isDropdownOpen && (
                <ul ref={dropdownRef} className="city_search_list">	
                    {cities.map((city) => (
                        <li 
                            key={city.code} 
                            className="city_search_item"
                            onClick={() => handleCitySelect(city)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleCitySelect(city)}
                        >
                            {city.nom} ({city.codesPostaux.join(", ")})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CitySearch;
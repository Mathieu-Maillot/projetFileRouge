import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/utils/Form';
import Icon from '../../components/utils/Icon';
import Dropdown from '../../components/utils/Dropdown';
import data from '../../../temp/data.json';
import { getFormattedDate, getFormattedTime } from '../../components/utils/DataHelpers';
import FormSearch from '../../components/utils/FormSearch';
import { useAuthStore } from '../../../cfg/store/AuthStore';

const SearchTraject = () => {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(false);
	const [activeMenu, setActiveMenu] = useState(false);
	const [nbrPassenger, setNbrPassenger] = useState(1);
	const [searchResults, setSearchResults] = useState([]);
	const [searchPerformed, setSearchPerformed] = useState(false);
	const [searchDebug, setSearchDebug] = useState({});
	const [selectedDate, setSelectedDate] = useState('');
	const data = useAuthStore(state => state.data);
	useEffect(() => {
		const checkIfMobile = () => {
			const mediaQuery = window.matchMedia(`(max-width: 768px)`);
			setIsMobile(mediaQuery.matches);
		};

		checkIfMobile();

		const mediaQuery = window.matchMedia(`(max-width: 768px)`);
		mediaQuery.addEventListener('change', checkIfMobile);

		return () => mediaQuery.removeEventListener('change', checkIfMobile);
	}, []);

	const normalizeDate = (dateString) => {
		if (!dateString) return null;

		try {
			const date = new Date(dateString);
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

		console.log("Raw date input:", rawDate);
		console.log("Normalized search date:", searchDate);

		let filteredRides = [...data.rides];
		console.log("Initial rides count:", filteredRides.length);

		if (departureLocation) {
			filteredRides = filteredRides.filter(ride =>
				ride.departureLocation.toLowerCase() === departureLocation.toLowerCase()
			);
			console.log("After departure filter:", filteredRides.length);
		}

		if (arrivalLocation) {
			filteredRides = filteredRides.filter(ride =>
				ride.arrivalLocation.toLowerCase() === arrivalLocation.toLowerCase()
			);
			console.log("After arrival filter:", filteredRides.length);
		}

		if (searchDate) {
			const sampleRides = filteredRides.slice(0, 3);
			sampleRides.forEach(ride => {
				const rideDate = normalizeDate(ride.departureTime.$date);
				console.log(`Sample ride date: ${ride.departureLocation} -> ${ride.arrivalLocation}, date: ${ride.departureTime.$date} -> normalized: ${rideDate}`);
			});

			filteredRides = filteredRides.filter(ride => {
				const rideDate = normalizeDate(ride.departureTime.$date);
				const isMatch = rideDate === searchDate;
				console.log(`Date comparison: ${rideDate} vs ${searchDate} = ${isMatch}`);
				return isMatch;
			});
			console.log("After date filter:", filteredRides.length);
		}

		filteredRides = filteredRides.filter(ride => ride.availableSeats >= nbrPassenger);
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
						inputName={['departLocation', "arrivalLocation"]}
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

				{searchPerformed && (
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
										key={ride._id.$oid}
										className="element_box cursor_pointer"
										onClick={() => handleRideClick(ride._id.$oid)}
									>
										<div className="container_between w_100">
											<h3>{ride.departureLocation} → {ride.arrivalLocation}</h3>
											<p className="text_color02">{ride.price} €</p>
										</div>
										<div className="container_details">
											<p>Départ: {getFormattedDate(ride.departureTime.$date)}</p>
											<p>Heure: {getFormattedTime(ride.departureTime.$date)}</p>
											<p>Places disponibles: {ride.availableSeats}</p>
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
			</div>
		</section>
	);
};

export default SearchTraject;
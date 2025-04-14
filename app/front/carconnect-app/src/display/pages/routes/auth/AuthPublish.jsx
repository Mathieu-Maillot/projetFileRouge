import React, { useState } from 'react'
import Form from '../../../components/utils/Form'
import { useNavigate } from 'react-router-dom';
import { useTrajectStore } from './../../../../cfg/store/TrajectStore';
import { useAuthStore } from '../../../../cfg/store/AuthStore';
import Dropdown from '../../../components/utils/Dropdown';
import TrajectManagement from '../../../../data/auth/TrajectManagement';

const AuthPublish = () => {
	const { user, isAuthenticated } = useAuthStore();
	const navigate = useNavigate();
	const {handlePublishTraject} = TrajectManagement();
	const [activeMenu, setActiveMenu] = useState(false);
	const [nbrPassenger, setNbrPassenger] = useState(2);
	const [price, setPrice] = useState(25);
	const [vehicle, setVehicle] = useState('');
	const [description, setDescription] = useState("Trajet par l'autoroute A8, vue sur la mer. Climatisation disponible.");
	const [nonSmoking, setNonSmoking] = useState(true);
	const [petsAllowed, setPetsAllowed] = useState(false);
	const [arrivalTime, setArrivalTime] = useState('');
	const [departDateTime, setDepartDateTime] = useState('');
	const getCurrentDateTime = () => {
		const now = new Date();
		return now.toISOString().slice(0, 16);
	};
	const onAction = (formData) => {
		try {
			const departure = formData.get('departure');
			const arrival = formData.get('arrival');
			const departureTime = formData.get('departureTime');
			const arrivalTime = formData.get('arrivalTime');
			console.log(departureTime)
			console.log(departure)
			console.log(arrival)
			if (!departure) {
             console.log("Veuillez indiquer la ville de départ");
                return;
            }
            
            if (!arrival) {
				console.log("Veuillez indiquer la ville d'arrivée");
                return;
            }
            
            if (!departureTime) {
				console.log("Veuillez indiquer la date et l'heure de départ");
                return;
            }

            

            const trajectData = {
                departureLocation: departure,
                arrivalLocation: arrival,
                departureTime: departureTime,
                arrivalTime: arrivalTime,
                driverId: user.id,
                availableSeats: nbrPassenger,
                price: parseInt(price, 10),
                vehicle: vehicle || (user.vehicule ? `${user.vehicule.brand} ${user.vehicule.model}` : "Renault Clio"),
                description: description,
                nonSmoking: nonSmoking,
                petsAllowed: petsAllowed
            };

            console.log("Données du trajet à envoyer:", trajectData);

            handlePublishTraject(trajectData);
            navigate('/rides');
        } catch (error) {
            console.error("Erreur lors de la publication du trajet:", error);
            console.log("Une erreur est survenue lors de la publication du trajet.");
        }
	}
	const handleDateTimeChange = (e) => {
        setDepartDateTime(e.target.value);
    };
	const handleButtonForm = () => {
        return (
            <div className="form_element relative">
                <button
                    type='button'
                    onClick={() => setActiveMenu(!activeMenu)}
                    className='btn btn_form'
                    style={{ width: '100%', textAlign: 'left' }}
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
        );
    };
	const additionalFields = () => {
        return (
            <>
                {handleButtonForm()}
                
                <div className="form_element">
                    <input
                        type="datetime-local"
                        name="arrivalTime"
                        id="arrivalTime"
                        className="input_default"
                        value={!arrivalTime ? getCurrentDateTime() : ''}
                        onChange={handleDateTimeChange}
                        placeholder="Date et heure de départ"
                    />
                    <label htmlFor="arrivalTime" className="label_default label_focused"></label>
                </div>

                <div className="form_element">
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="input_default"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        placeholder="Prix (€)"
                    />
                    <label htmlFor="price" className="label_default label_focused"></label>
                </div>

                <div className="form_element">
                    <input
                        type="text"
                        name="vehicle"
                        id="vehicle"
                        className="input_default"
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        placeholder="Marque et modèle"
                    />
                    <label htmlFor="vehicle" className="label_default label_focused"></label>
                </div>

                <div className="form_element">
                    <textarea
                        name="description"
                        id="description"
                        className="input_default textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description du trajet"
                        rows="3"
                    ></textarea>
                    <label htmlFor="description" className="label_default label_focused"></label>
                </div>

                <div className="form_element options-container">
                    <div className="option-toggle">
                        <label htmlFor="nonSmoking" className="option-label">
                            Non-fumeur
                        </label>
                        <div
                            className={`toggle-switch ${nonSmoking ? 'active' : ''}`}
                            onClick={() => setNonSmoking(!nonSmoking)}
                        >
                            <div className="toggle-slider"></div>
                        </div>
                    </div>

                    <div className="option-toggle">
                        <label htmlFor="petsAllowed" className="option-label">
                            Animaux autorisés
                        </label>
                        <div
                            className={`toggle-switch ${petsAllowed ? 'active' : ''}`}
                            onClick={() => setPetsAllowed(!petsAllowed)}
                        >
                            <div className="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
	return (
		<>
			<div id="publish_traject">
				<div className="container">
					<div className="wrapper">
						<Form
							title="Publier"
							formAction={onAction}
							inputCount={3}
							placeholder={['Ville de départ ', "Ville d'arrivée", "Date"]}
							inputTypes={['search', 'search', 'datetime-local']}
							inputName={['departure', "arrival", "departureTime"]}
							buttonName="Publier"
							btnClass="btn btn_base"
							children={additionalFields()}

						/>
					</div>
				</div>
				
			</div>

		</>
	)
}

export default AuthPublish
import React, { useState } from 'react';
import Icon from '../../components/utils/Icon';
import Dropdown from '../../components/utils/Dropdown';
import FormSearch from '../../components/utils/FormSearch';
import { useAuthStore } from '../../../cfg/store/AuthStore';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    const dataUser = useAuthStore(state => state.dataUser);
    const setDataUser = useAuthStore((state) => state.setDataUser);

    const [isMobile, setIsMobile] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);
    const [nbrPassenger, setNbrPassenger] = useState(1);
    const [selectedDate, setSelectedDate] = useState(formattedDate);
    const navigate = useNavigate();
    
    const handleDateChange = (value) => {
        setSelectedDate(value);
    };
	const handleSearchTraject = (formData) => {
        // Create a complete form data object with all fields
        const completeFormData = {
            ...formData,
            date: selectedDate,
            nbrPassenger: nbrPassenger
        };
        
        console.log("Hero search data:", completeFormData);
        
        // Store the search data for use on other pages
        setDataUser({ 
            formData: completeFormData, 
            selectedDate 
        });
        
        navigate("/routes/search");
    };
    
    const customFormInputs = () => {
        return (
            <>
                <div className="form_element">
                    <input
                        type="date"
                        id="search-date"
                        name="date"
                        className='input_default'
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                    <label htmlFor="search-date" className="label_default label_focused">
                    </label>
                </div>
            </>
        );
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
                {/* No hidden input - we'll pass nbrPassenger directly */}
            </div>
        );
    };
    
    return (
        <section id='hero'>
            <div className="container_whole">
                <div className="container_image">
                    <div className="wrapper">
                        <img src="/images/illustration-01.webp" alt="placeholder" />
                    </div>
                </div>
                <div className="container flex column gap2">
                    <div className="element">
                        <h1>Votre recherche</h1>
                    </div>
                    <div className="element">
                        <p className='text_color02'>Trouvez rapidement votre trajet idéal pour aller d'un point A à un point B en quelques clics. Économisez sur vos déplacements tout en réduisant votre empreinte carbone grâce à notre service de covoiturage simple et efficace.
                        </p>
                    </div>
                    <div className="wrapper">
					<FormSearch
                        formAction={(data) => {
                            // Inject passenger count and date before passing to handler
                            handleSearchTraject({
                                ...data,
                                nbrPassenger: nbrPassenger,
                                date: selectedDate
                            });
                        }}
                        inputCount={2}
                        placeholder={['Ville de départ', "Ville d'arrivée"]}
                        inputTypes={['search', 'search']}
                        inputName={['depart', 'arrival']}
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
                </div>
            </div>
            <div className="container_features">
                {/* Features sections remain unchanged */}
            </div>
        </section>
    );
};

export default HeroSection;
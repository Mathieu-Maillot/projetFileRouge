import React, { useState, useEffect } from 'react'
import Form from '../../components/utils/Form'
import Icon from './../../components/utils/Icon';

const SearchTraject = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);
    const [nbrPassenger, setNbrPassenger] = useState(1);
    
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
    
    const handleSearchTraject = () => {
        console.log('searching traject')
    }

    const handleButtonForm = () => {
        return (
            <>
                <div className="element relative">
                    <button 
                        type='button' 
                        onClick={() => setActiveMenu(!activeMenu)} 
                        className='btn btn_form'
                        style={{ minWidth: '12rem', textAlign: 'center' }}
                    >
                        {nbrPassenger} {nbrPassenger <= 1 ? "Passager" : "Passagers"}
                    </button>
                    {dropdownMenu()}
                </div>
            </>
        )
    }
    
    const dropdownMenu = () => {
        return (
            <div className={`dropdown ${activeMenu ? 'active' : 'disabled'}`}>
                {isMobile && activeMenu && (
                    <div className="flex j_end" onClick={() => setActiveMenu(!activeMenu)}>
                        <Icon type="close" size="3rem" />
                    </div>
                )}

                <div className="dropdown_menu">
                    <div className="flex between w_100">	
                        <p className='text_color02'>{nbrPassenger <= 1 ? "Passager" : "Passagers"}</p>
                        <div className="flex gap2">
                            <button className='btn' type='button' onClick={() => setNbrPassenger(nbrPassenger > 1 ? nbrPassenger - 1 : nbrPassenger)}>-</button>
                            <p>{nbrPassenger}</p>
                            <button className='btn' type='button' onClick={() => setNbrPassenger(nbrPassenger < 8 ? nbrPassenger + 1 : nbrPassenger)}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <section id="search_traject">
            <div className="container">
                {isMobile && (
                    <div className="wrapper">
                        <h1>Recherche, aventure et partage !</h1>
                    </div>
                )}
                <div className="wrapper">
                    <Form 
                        formAction={handleSearchTraject} 
                        inputCount={3} 
                        placeholder={['Départ', "Destination", "Date"]} 
                        inputTypes={['text', 'text', 'date']} 
                        inputName={['depart', "arrival", "date"]} 
                        buttonName="Rechercher" 
                        btnClass="btn btn_base"
                        children={handleButtonForm()}
                    />
                </div>
            </div>
        </section>
    )
}

export default SearchTraject
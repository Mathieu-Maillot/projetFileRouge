import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../../utils/Icon'
import useStore from '../../../../cfg/store/AuthStore'

const DropDownNav = ({user}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const logout = useStore(state => state.logout);
    
    const userLinks = [
        { name: 'Mon profil', path: '/account/profile', icon: 'user' },
        { name: 'Mes trajets', path: '/account/rides', icon: 'car' },
        { name: 'Mes réservations', path: '/account/bookings', icon: 'calendar' },
        { name: 'Mes messages', path: '/account/messages', icon: 'message-square' },
        { name: 'Paramètres', path: '/account/settings', icon: 'settings' },
    ];
    
    const logoutUser = () => {
        logout();
        navigate('/');
    }
    
    const handleNavigate = (path) => {
        navigate(path);
        setIsOpen(false);
    }
    
    return (
        <>
            <div className="dropdown_container relative">
                <div 
                    className="dropdown_trigger element flex gap1 a_center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Icon type="user" size="1.5rem" />
                    <p>{user?.firstName || 'Compte'}</p>
                    <Icon type={isOpen ? "chevron-up" : "chevron-down"} size="1.5rem" />
                </div>
                
                {isOpen && (
                    <div className="wrapper_dropdown">
                        {userLinks.map((link, index) => (
                            <div key={index} className="element flex gap1 a_center" onClick={() => handleNavigate(link.path)}>
                                <Icon type={link.icon} size="1.5rem" />
                                <p>{link.name}</p>
                            </div>
                        ))}
                        <div className="divider"></div>
                        <div className="element flex gap1 a_center">
                            <Icon type="log-out" size="1.5rem" />
                            <p onClick={() => logoutUser()}>Déconnexion</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default DropDownNav
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../../utils/Icon'
import DropDownNav from './DropDownNav';
import useStore from '../../../../cfg/store/AuthStore';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { user } = useStore();
    const isAuthenticated = user && user.id;

    const navLinks = [
        { name: 'Rechercher', path: '/routes/search', icon: 'search' },
        { name: 'Publier un trajet', path: '/routes/publish', icon: 'plus' },
    ];

    if (!isAuthenticated) {
        navLinks.push({ name: "S'identifier", path: '/auth/check', icon: 'user' });
    }

    const userLinks = [
        { name: 'Mon profil', path: '/account/profile', icon: 'user' },
        { name: 'Mes trajets', path: '/account/rides', icon: 'car' },
        { name: 'Mes réservations', path: '/account/bookings', icon: 'calendar' },
        { name: 'Mes messages', path: '/account/messages', icon: 'message-square' },
        { name: 'Paramètres', path: '/account/settings', icon: 'settings' },
        { name: 'Se déconnecter', path: '/auth/logout', icon: 'log-out' },
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNavLinkClick = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className='navbar'>
            <button
                className='menu-button'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {!isMenuOpen && <Icon type='menu' size='2.5rem' />}
            </button>

            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <div className="flex between">
                    {isMenuOpen && <p>Navigation</p>}
                    <button
                        className='menu-button'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen && <Icon type='close' size='2.5rem' />}
                    </button>
                </div>

                {navLinks.map((link, index) => (
                    <li key={index}>
                        <NavLink to={link.path} className='nav-item flex a_center gap1' onClick={handleNavLinkClick}>
                            <Icon type={link.icon} size='1.5rem' />
                            <p className="nav-text">{link.name}</p>
                        </NavLink>
                    </li>
                ))}

                {isAuthenticated && !isMobile && !isMenuOpen && (
                    <li className="desktop-only">
                        <DropDownNav user={user} />
                    </li>
                )}

                {isAuthenticated && (isMobile || isMenuOpen) && (
                    <>
                        <li className="mobile-separator">
                            <div className="separator">
                                <p>Mon compte</p>
                            </div>
                        </li>
                        {userLinks.map((link, index) => (
                            <li key={`user-${index}`} className="mobile-only">
                                <NavLink to={link.path} className='nav-item flex a_center gap1' onClick={handleNavLinkClick}>
                                    <Icon type={link.icon} size='1.5rem' />
                                    <p className="nav-text">{link.name}</p>
                                </NavLink>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Nav
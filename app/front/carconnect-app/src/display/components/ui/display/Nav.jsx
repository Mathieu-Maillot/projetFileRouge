import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../../utils/Icon'

const Nav = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const navLinks = [
		{ name: 'Rechercher', path: '/routes/search', icon: 'search' },
		{ name: 'Publier un trajet', path: '/routes/publish', icon: 'plus' },
		{ name: "S'identifier", path: '/auth/check', icon: 'user' }
	]

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
						<NavLink to={link.path} className='nav-item flex a_center gap1'> 
							<Icon type={link.icon} size='2rem' />
							<p className="nav-text">{link.name}</p> 
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Nav
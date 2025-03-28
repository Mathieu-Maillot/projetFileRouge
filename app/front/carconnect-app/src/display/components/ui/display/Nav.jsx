import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../../utils/Icon'

const Nav = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const navLinks = [
		{ name: 'Rechercher', path: '/route/search', icon: 'search' },
		{ name: 'Pricing', path: '/route/add', icon: 'plus' },
		{ name: 'Contact', path: '/auth/check', icon: 'user' }
	]

	return (
		<nav className='navbar'>
			<button
				className='menu-button'
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				{!isMenuOpen &&  <Icon type='menu' size='2.5rem' />}
			</button>

			<ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
				<div className="flex between">
					{isMenuOpen && <p>Navigation</p>}
				<button
				className='menu-button'
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				{isMenuOpen &&  <Icon type='close' size='2.5rem' />}
			</button>
				</div>
				{navLinks.map((link, index) => (
					<li key={index}>
						<NavLink to={link.path} className='nav-item'>
							<Icon type={link.icon} size='2rem' />
							<p>{link.name}</p>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Nav
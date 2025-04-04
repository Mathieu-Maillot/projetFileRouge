import React from 'react'
import Icon from '../../utils/Icon'
import AppContainer from '../../../AppContainer'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

const Header = () => {
	return (
		<>
			<header id="header">
				<div className="lyt_container h_100">
					<div className="flex between h_100 a_center">
						<Logo />
						<Nav />
					</div>
				</div>
			</header>
		</>
	)
}

export default Header
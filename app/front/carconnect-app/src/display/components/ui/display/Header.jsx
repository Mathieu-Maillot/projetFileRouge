import React from 'react'
import Icon from '../../utils/Icon'
import AppContainer from '../../../AppContainer'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom'

const Header = () => {
	const navigate = useNavigate();
	return (
		<>
			<header id="header">
				<div className="lyt_container h_100">
					<div className="flex between h_100 a_center">

						<div className="flex a_center h_100" onClick={() => navigate("/")}>
							<h1><strong className='color_primary'>Car</strong>Connect</h1>
						</div>
						<Nav />
					</div>
				</div>
			</header>
		</>
	)
}

export default Header
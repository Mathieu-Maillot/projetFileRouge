import React from 'react'
import Icon from '../../utils/Icon'

const Header = () => {
	return (
		<>
			<header id="header">
				<div className="flex between h_100">

					<div className="flex a_center h_100">
						<h1><strong className='color_primary'>Car</strong>Connect</h1>
					</div>
					<nav className="flex a_center h_100">
						<ul className='flex gap2'>
							<li className='flex gap05 a_center'>
								<Icon type='search' size='2rem' />
								<p>Rechercher</p>
							</li>
							<li className='flex gap05 a_center'>
								<Icon type='plus' size='2rem' />
								<p>Poster un trajet</p>
							</li>
							<li className='flex gap05 a_center'>
								<Icon type='user' size='2rem' />
								<p>S'identifier</p>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	)
}

export default Header
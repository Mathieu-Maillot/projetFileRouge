import React from 'react'
import { calculateAge } from './../../components/utils/CalculateAge';

const DisplayProfile = ({ user }) => {
	return (
		<>
			<div id="displayProfile">
				<div className="flex column gap1">
					<h1>Mon profil</h1>
					<div className='flex column gap1 pad1'>
						<div className="wrapper">
							<div className="flex gap1">
								<p>{user?.firstName}</p>
								<p>{user?.lastName}</p>
							</div>
							<div className="element">
								<p>{user?.email}</p>
							</div>


							<div className="element">
								<p>Née le  {user?.birthdate}</p>
								<p>{calculateAge(user?.birthdate)} ans</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</>
	)
}

export default DisplayProfile
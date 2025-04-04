import React from 'react'
import data from '../../../temp/data.json'
import Icon from '../../components/utils/Icon';
const Profile = () => {

	const user = data.find(user => user._id.$oid === '605c72ef1532071cba029d60');
	console.log(user)
	return (
		<>
			<div id="profile">
				<div className="container">
					<div className="sidebar">
						<div className="wrapper margin_top08">
							<div className="flex column gap1">
								<h1>Menu</h1>
								<ul className='flex column gap1'>
									<li>Informations</li>
									<li>Notes</li>
									<li>Messages</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="container_content">
						<div className="wrapper_top flex gap 1rem">
							<div className="element">
								<Icon type="avatar" size="7rem" />
							</div>
							<div className="flex a_center gap05">
								<p>{user?.firstName}</p>
								<p>{user?.lastName}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
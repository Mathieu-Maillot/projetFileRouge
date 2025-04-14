import React from 'react'
import { getAverageRating } from '../../utils/DataHelpers';
import Icon from '../../utils/Icon';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
	const averageRating = getAverageRating(user?.reviews);
	const navigate = useNavigate();
	const renderRating = () => {
		return (
			<>
				<div className="flex gap05 a_center">
					<Icon type='FullStar' size='1.5rem' />
					{averageRating.length > 0 ? (
						<p>{averageRating} / 5 - {averageRating.length} avis</p>
					) : (
						<p>L'utilisateur n'a pas encore de notes</p>
					)}
				</div>
			</>
		)
	}
	return (
		<>
			<div className="wrapper_driver" onClick={() => navigate(`/user/profile/${user.id}`)}>
				<div className="flex gap2 a_center">
					<div className="element_between w_100">
						<div className="flex gap05">
							<p>{user?.firstName} {user?.lastName} </p>
							<span><Icon type='valid' size='1.5rem' /></span>
						</div>

						<div className="element">
							<p className='text_link text_color_blue'>Visiter le profil</p>

						</div>
					</div>
				</div>
				{renderRating()}
				<p>Visiter le profil</p>
			</div>

		</>
	)
}

export default UserCard
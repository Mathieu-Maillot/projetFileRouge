import React from 'react'
import Icon from '../../../../components/utils/Icon'
import { getAverageRating } from '../../../../components/utils/DataHelpers';
import Button from '../../../../components/helpers/Button';
import DriverCard from '../../../../components/ui/user/UserCard';
import UserCard from '../../../../components/ui/user/UserCard';
const RenderDriver = ({ driver, ride }) => {

	const contactDriver = () => {
		alert("Cette fonctionnalité n'est pas encore disponible")
	}
	return (
		<>
			<UserCard user={driver} />
			<div className="flex column gap3">
				<div className="element_driver">
					{ride?.nonSmoking ? (
						<>
							<div className="flex gap05 a_center">
								<Icon type="allow-smoke" size="2rem" />
								<p>- Le conducteur accepte les pauses fumeurs</p>
							</div>

						</>
					) : (
						<>
							<div className="flex gap05 a_center">
								<Icon type="non-smoke" size="2rem" />
								<p>- Le conducteur n'accepte pas de pauses fumeurs</p>
							</div>

						</>
					)}
				</div>
				<div className="element_driver">
					{ride?.petsAllowed ? (
						<>
							<div className="flex gap05 a_center">
								<Icon type="allow-animals" size="2rem" />
								<p>- Le conducteur accepte les animaux</p>
							</div>

						</>
					) : (
						<>
							<div className="flex gap05 a_center">
								<Icon type="disallow-animals" size="2rem" />
								<p>- Le conducteur ne préfère pas voyager avec des animaux de compagnie</p>
							</div>

						</>
					)}
				</div>
				<div className="element_driver">
					<div className="flex gap05 a_center">
						<Icon type="car" size="2rem" />
						<p>- {driver?.vehicule?.brand} {driver?.vehicule?.model} - {driver?.vehicule?.color}</p>
					</div>
				</div>
				<div className="element_driver">
					<div className="flex gap05 a_center">
						<Button variant='close' onClick={() => contactDriver()}>Contacter {driver?.firstName}</Button>
					</div>
				</div>
			</div>

		</>
	)
}

export default RenderDriver
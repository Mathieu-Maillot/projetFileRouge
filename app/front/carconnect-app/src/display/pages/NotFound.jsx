import React from 'react'
import Button from '../components/helpers/Button'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate();
	return (

		<section id="error">
			<div className="container">
				<div className="flex column gap2 a_center j_center">
					<div className="element">
						<h1>Errerur 404. La page est introuvable</h1>
					</div>
					<div className="element">
						<Button variant='success' onClick={() => navigate("/")}>Retour à la page d'accueil</Button>

					</div>
				</div>
			</div>
		</section>

	)
}

export default NotFound
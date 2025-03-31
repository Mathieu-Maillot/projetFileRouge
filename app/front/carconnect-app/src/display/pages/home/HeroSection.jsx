import React from 'react'
import Form from '../../components/utils/Form'
import Icon from '../../components/utils/Icon'

const HeroSection = () => {

	const handleSearchTraject = () => {
		console.log('searching traject')
	}
	return (
		<section id='hero'>
			<div className="container_whole">
				<div className="container_image">
					<div className="wrapper">
						<img src="/images/illustration-01.jpg" alt="placeholder" />
					</div>
				</div>
				<div className="container flex column gap2">
					<div className="element">
						<h1>Votre recherche</h1>
					</div>
					<div className="element">
						<p className='text_color02'>Trouvez rapidement votre trajet idéal pour aller d'un point A à un point B en quelques clics. Économisez sur vos déplacements tout en réduisant votre empreinte carbone grâce à notre service de covoiturage simple et efficace.
						</p>
					</div>
					<Form formAction={handleSearchTraject} inputCount={4} placeholder={['Départ', "Destination", "Date", "1 Passager"]} inputTypes={['text', 'text', 'date', 'text']} inputName={['depart', "arrival", "date", "userNbr"]} buttonName="Rechercher" btnClass="btn btn_base" />
				</div>
			</div>
			<div className="container_features">
				<div className="flex column gap2">
					<div className="flex column gap1 a_center">
						<Icon type="save" size="6rem" />
						<h2>Économisez en partageant</h2>
					</div>
					<div className="element">
						<p className='text_color02'>Réduisez vos frais de déplacement quotidiens en partageant votre trajet. Une solution économique pour conducteurs et passagers.</p>

					</div>
				</div>

				<div className="flex column gap2">
					<div className="flex column gap1 a_center">
						<Icon type="nature" size="6rem" />
						<h2>Écologique et responsable</h2>
					</div>
					<div className="element">
						<p className='text_color02'>Contribuez à la réduction des émissions de CO2 en optimisant l'utilisation des véhicules. Un petit geste pour l'environnement, un grand pas pour la planète.</p>

					</div>
				</div>
				<div className="flex column gap2">
					<div className="flex column gap1 a_center">
						<Icon type="community" size="6rem" />
						<h2>Communauté conviviale</h2>
					</div>
					<div className="element">
						<p className='text_color02'>Rejoignez une communauté dynamique de covoitureurs, faites de nouvelles rencontres et rendez vos trajets plus agréables au quotidien.</p>

					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
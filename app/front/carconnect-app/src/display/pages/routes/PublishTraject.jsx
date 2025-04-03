import React, { useState } from 'react'
import Form from '../../components/utils/Form'
import Dropdown from '../../components/utils/Dropdown';

const PublishTraject = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [activeMenu, setActiveMenu] = useState(false);
	const [nbrPassenger, setNbrPassenger] = useState(1);
	const handlePublishTraject = () => {
		console.log('publishing trajectory')
	}
	const handleButtonForm = () => {
		return (
			<div className="form_element relative">
				<button
					type='button'
					onClick={() => setActiveMenu(!activeMenu)}
					className='btn btn_form'
					style={{ width: '100%', textAlign: 'left' }}
				>
					{nbrPassenger} {nbrPassenger <= 1 ? "Passager" : "Passagers"}
				</button>
				<Dropdown
					activeMenu={activeMenu}
					setActiveMenu={setActiveMenu}
					nbrPassenger={nbrPassenger}
					setNbrPassenger={setNbrPassenger}
				/>
			</div>
		)
	}

	return (
		<>
			<section id="publish_traject">
				<div className="container">


					<div className="container_form">
						<div className="element">
							<h1>Prenez votre route en main !</h1>
						</div>
						<div className="element">
							<p className='text_color02'>Partagez votre voyage et réduisez vos frais de transport ! Indiquez votre trajet, la date et le nombre de places disponibles dans votre véhicule. Voyagez ensemble, économisez et réduisez votre empreinte carbone.
							</p>
						</div>
						<Form
							title="Publier"
							formAction={handlePublishTraject}
							inputCount={3}
							placeholder={['Ville de départ ', "Ville d'arrivée", "Date"]}
							inputTypes={['search', 'search', 'date']}
							inputName={['depart', "arrival", "date"]}
							buttonName="Search"
							btnClass="btn btn_base"
							children={handleButtonForm()}
						/>
					</div>
					<div className="container_content">
						<div className="wrapper">
							<img className='images' src="\images\illustration-08.webp" alt="" />

						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default PublishTraject
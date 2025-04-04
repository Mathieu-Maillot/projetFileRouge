import React, { useEffect } from 'react'
import Form from '../../components/utils/Form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../../components/ui/display/Logo'
import AuthManagement from '../../../data/auth/AuthManagement'
import Icon from '../../components/utils/Icon'
const Check = () => {
	const { handleCheck, handleLogin, handleRegister } = AuthManagement();
	const location = useLocation();
	const navigate = useNavigate();
	const pathCheck = location.pathname === '/auth/check';
	const pathRegister = location.pathname === '/auth/register';
	const pathDriver = location.pathname === '/auth/driver';
	const pathLogin = location.pathname === '/auth/login';
	const [text, setText] = useState({
		title: 'Bienvenue',
		subtitle: 'Entrer votre adresse email pour vérifier si vous avez un compte existant.'
	})
	const textCondition = () => {
		if (pathCheck) {
			setText({
				title: 'Bonjour',
				subtitle: 'Entrer votre adresse email pour vérifier si vous avez un compte existant.'
			})
		}
		else if (pathRegister) {
			setText({
				title: 'Bienvenue',
				subtitle: 'Entrer vos informations pour enregistrer un compte.'
			})
		}
		else if (pathDriver) {
			setText({
				title: 'Êtes-vous conducteur ?',
				subtitle: 'Remplisser les informations sur votre véhicule'
			})
		}
		else {
			setText({
				title: 'Connexion',
				subtitle: 'Entrer votre adresse email et votre mot de passe pour vos connecter.'
			})
		}
	}
	useEffect(() => {
		textCondition()
	}, [location])
	return (
		<>

			<div id="check">
				<div className="container">
					<div className="container_check pad2">
						<div className="flex j_center">
							<Logo />
						</div>

						<div className="container_column_center h_100">
							<div className="flex column gap4">
								<div className="wrapper_column gap2">
									<div className="element_center w_100">
										<h1>{text.title}</h1>
									</div>
									<div className="element">
										{<p className='text_size02'>{text.subtitle}</p>}
									</div>
								</div>
								{pathCheck && <Form formAction={handleCheck} inputCount={1} placeholder={["example@gmail.com"]} inputTypes={['email']} inputName={['email']} buttonName="Prochaine étape" btnClass="btn btn_base" />}
								{pathLogin && <Form formAction={handleLogin} inputCount={2} placeholder={["example@gmail.com", "mot de passe"]} inputTypes={['email', "password"]} inputName={['email, password']} buttonName="Se connecter" btnClass="btn btn_base" />}
								{pathLogin &&
									<>
										<div className="element_column gap1">
											<p className='text_link' onClick={() => navigate("/auth/forgotpassword")}>Mot de passe oublié ?</p>
											<p className='text_link' onClick={() => navigate("/auth/register")}>Pas encore de compte ?</p>
										</div>


									</>}
								{pathRegister && <Form
									formAction={handleRegister}
									inputCount={6}
									selectCount={1}
									selectOptions={[['Homme', 'Femme', 'Ne se prononce pas']]}
									selectName={['gender']}
									placeholder={["example@gmail.com", "Nom d'utilisateur", "mot de passe", "confirmer mot de passe", 'Date de naissance', 'Téléphone']}
									inputTypes={['email', 'text', 'password', 'password', 'date', 'tel']}
									inputName={['email', 'username', 'password', 'c_password', ' birthdate', 'phone']}
									buttonName="Prochaine étape"
									btnClass="btn btn_base"
								/>}
								{pathDriver && <Form formAction={handleRegister} inputCount={3} placeholder={["Modèle", "Marque", "Nombre de sièges"]} inputTypes={['text', 'text', 'number']} inputName={['email', 'username', 'password', 'c_password']} buttonName="Finaliser l'enregistrement" btnClass="btn btn_base" />}
								{pathDriver && <p className='text_link'>Ignorer cette étape ?</p>}

							</div>

						</div>
						<div className="flex a_center j_center">
							<div className="element">
								<Icon type="arrowl" size="5rem" action={() => navigate(-1)} />
							</div>
						</div>
					</div >
					<div className="container_content">
						<div className="wrapper">
							<img src="\images\illustration-07.webp" alt="" />
						</div>
					</div>
				</div >
			</div >

		</>
	)
}

export default Check
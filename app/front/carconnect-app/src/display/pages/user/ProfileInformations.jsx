import React from 'react'
import FormButton from '../../components/utils/FormButton'
// import UserManagement from '../../../data/user/UserManagement' 

const ProfileInformations = ({ user }) => {
	//   const { updateUserProfile } = UserManagement();

	const handleSaveProfile = (updatedData) => {
		console.log("Updated profile data:", updatedData);
		updateUserProfile(updatedData);
	};

	return (
		<>
			<div className="profile_container flex column gap2">

				<FormButton
					title="Informations personnelles"
					buttonName="Informations personnelles"
					inputCount={6}
					placeholder={["Adresse email", "Prénom", "Nom", "Dâte de naissance", "Genre", "Conducteur"]}
					inputTypes={['email', 'text', 'text', 'date', 'text', 'text']}
					inputName={['email', 'firstName', 'lastName', 'birthdate','gender', 'driver']}
					selectCount={1}
					isGenderField={true}
					selectOptions={[['Homme', 'Femme', 'Ne se prononce pas']]}
					selectName={['gender']}
					userData={user}
					onSave={handleSaveProfile}
				/>

				<FormButton
					title="Securité"
					buttonName="Changer le mot de passe"
					inputCount={1}
					placeholder={["Nouveau mot de passe"]}
					inputTypes={['password']}
					inputName={['newPassword']}
					userData={{}}
					onSave={handleSaveProfile}
				/>

				<FormButton
					title="Informations"
					buttonName="Informations Complémentaires"
					inputCount={2}
					placeholder={[ "Ville", "Code postal"]}
					inputTypes={[ 'text', 'text']}
					inputName={['city', 'postalCode']}
					userData={{
						city: user?.city || '',
						postalCode: user?.postalCode || ''
					}}
					onSave={handleSaveProfile}
				/>
				
			</div>
		</>
	)
}

export default ProfileInformations
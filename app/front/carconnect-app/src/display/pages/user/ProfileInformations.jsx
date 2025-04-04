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
					inputCount={4}
					placeholder={["Adresse email", "Prénom", "Nom", "Date de naissance"]}
					inputTypes={['email', 'text', 'text', 'date']}
					inputName={['email', 'firstName', 'lastName', 'birthdate']}
					userData={user}
					onSave={handleSaveProfile}
				/>

				<FormButton
					title="Securité"
					buttonName="Changer le mot de passe"
					inputCount={1}
					placeholder={["New Password"]}
					inputTypes={['password']}
					inputName={[ 'newPassword']}
					userData={{}}
					onSave={handleSaveProfile}
				/>

				<FormButton
					title="Gender"
					buttonName="Gender Information"
					inputCount={1}
					placeholder={["Gender"]}
					inputTypes={['text']}
					inputName={['gender']}
					userData={{ gender: user?.gender || '' }}
					onSave={handleSaveProfile}
				/>

				{/* Address Information (if applicable) */}
				<FormButton
					title="Address"
					buttonName="Address Information"
					inputCount={3}
					placeholder={["Street", "City", "Postal Code"]}
					inputTypes={['text', 'text', 'text']}
					inputName={['street', 'city', 'postalCode']}
					userData={{
						street: user?.address?.street || '',
						city: user?.address?.city || '',
						postalCode: user?.address?.postalCode || ''
					}}
					onSave={handleSaveProfile}
				/>
			</div>
		</>
	)
}

export default ProfileInformations
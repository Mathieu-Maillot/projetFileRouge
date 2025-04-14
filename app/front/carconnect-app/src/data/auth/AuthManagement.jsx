import React from 'react'
import { useNavigate } from 'react-router-dom';
import useStore from '../../cfg/store/AuthStore';
import usersData from '../../temp/data.json'
const AuthManagement = () => {
	const navigate = useNavigate();
	const { setUser, errorPop, setAuthenticated } = useStore();
	const { login } = useStore();
	const handleCheck = (formData) => {
		const email = formData.get("email");
		const user = usersData?.users?.find(user => user.email === email);
		if (user) {
			console.log('User found, redirecting to login');
			navigate('/auth/login', { state: { email: formData.email } });
		} else {
			console.log('No user found, redirecting to register');
			navigate('/auth/register', { state: { email: formData.email } });
		}
	};

	const handleLogin = (formData) => {
		console.log(formData)
		const data = {};
		formData.forEach((value, name) => {
			data[name] = value;
		});

		console.log('Login attempt with:', data);

		const user = usersData.users.find(user =>
			user.email === data.email &&
			user.password === data.password
		);

		if (user) {
			console.log('Login successful for:', user.firstName);

			const fakeToken = btoa(`${user.email}:${Date.now()}`);

			setUser(user);
			setAuthenticated(true);
			login(user, fakeToken);

			navigate('/routes/search');
		} else {
			console.log('Login failed: Invalid credentials');
			errorPop('Email ou mot de passe incorrect');
		}
	};

	const handleRegister = (formData) => {
		console.log('Registration with data:', formData);

		const userExists = usersData.find(user => user.email === formData.email);

		if (userExists) {
			console.log('User already exists');
			errorPop('Un compte avec cet email existe déjà');
			return;
		}

		const newUser = {
			id: crypto.randomUUID(),
			firstName: formData.username || '',
			lastName: '',
			email: formData.email,
			password: formData.password,
			birthdate: formData.birthdate || '',
			age: formData.birthdate ? calculateAge(formData.birthdate) : 0,
			city: '',
			postalCode: '',
			gender: formData.gender || '',
			phone: formData.phone || '',
			role: "passenger",
			createdAt: { "$date": new Date().toISOString() },
			updatedAt: { "$date": new Date().toISOString() },
			vehicule: null,
			reviews: []
		};

		console.log('User registered successfully:', newUser);

		if (formData.isDriver) {
			navigate('/auth/driver', { state: { user: newUser } });
		} else {
			const fakeToken = btoa(`${newUser.email}:${Date.now()}`);

			setUser(newUser);
			setAuthenticated(true);
			login(newUser, fakeToken);

			navigate('/account/informations');
		}
	};

	const calculateAge = (birthdate) => {
		const today = new Date();
		const birthDate = new Date(birthdate);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();

		if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		return age;
	};

	return {
		handleCheck,
		handleLogin,
		handleRegister
	}
}

export default AuthManagement
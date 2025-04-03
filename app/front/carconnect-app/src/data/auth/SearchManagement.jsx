import React from 'react'

const AuthManagement = () => {


	const handleCheck = () => {
		console.log('searching traject')
	}
	const handleLogin = () => {
		console.log('login')
	}
	const handleRegister = () => {
		console.log('register')
	}
	return {
		handleCheck,
		handleLogin,
		handleRegister
	}
}

export default AuthManagement
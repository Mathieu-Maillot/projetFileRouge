import React from 'react'
import Form from '../../components/utils/Form'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const Check = () => {
	const handleCheck = () => {
		console.log('searching traject')
	}
	const location = useLocation();
	const pathCheck = location.pathname === '/auth/check';
	const pathRegister = location.pathname === '/auth/register';
	const pathLogin = location.pathname === '/auth/login';
	const [text, setText] = useState({
		title: 'Hello',
		subtitle: 'Enter your email adress to verify if we have an account registered for you.'
	})
	const textCondition = () => {
		if (pathCheck) {
			setText({
				title: 'Hello',
				subtitle: 'Enter your email adress to verify if we have an account registered for you.'
			})
		}
		else if (pathRegister) {
			setText({
				title: 'Welcome',
				subtitle: 'Enter your email adress  to create an account.'
			})
		}
		else {
			setText({
				title: 'Welcome back',
				subtitle: 'Enter your email adress and password to login.'
			})
		}
	}
	return (
		<>

			<section id="check">
				<div className="container">
					<div className="container_check pad2">
						<div className="flex">
							<div className="element_center w_100" onClick={() => navigate("/")}>
								<h2 className='cursor_pointer'><strong className='color_primary'>Car</strong>Connect</h2>

							</div>
						</div>

						<div className="container_column_center h_100">
							<div className="flex column gap4">
								<div className="wrapper_column gap2">
									<div className="element_center w_100">
										<h2 className="title_size03 geist">{text.title}</h2>
									</div>
									<div className="element">
										{<p className='text_size02'>{text.subtitle}</p>}
									</div>
								</div>
								<Form formAction={handleCheck} inputCount={1} placeholder={["example@gmail.com"]} inputTypes={['email']} inputName={['email']} buttonName="Valider" btnClass="btn btn_base" />
							</div>
						</div>
					</div >
					<div className="container_content">
					</div>
				</div >
			</section >

		</>
	)
}

export default Check
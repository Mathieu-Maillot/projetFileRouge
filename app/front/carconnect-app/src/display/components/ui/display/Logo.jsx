import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="flex a_center h_100 cursor_pointer" onClick={() => navigate("/")}>
				<h1><strong className='color_primary'>Car</strong>Connect</h1>
			</div>
		</>
	)
}

export default Logo
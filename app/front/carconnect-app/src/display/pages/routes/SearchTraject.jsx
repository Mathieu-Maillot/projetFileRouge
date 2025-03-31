import React, { useState, useEffect } from 'react'
import Form from '../../components/utils/Form'
import Icon from '../../components/utils/Icon';
import Dropdown from '../../components/utils/Dropdown';

const SearchTraject = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [activeMenu, setActiveMenu] = useState(false);
	const [nbrPassenger, setNbrPassenger] = useState(1);

	useEffect(() => {
		const checkIfMobile = () => {
			const mediaQuery = window.matchMedia(`(max-width: 768px)`);
			setIsMobile(mediaQuery.matches);
		};

		checkIfMobile();

		const mediaQuery = window.matchMedia(`(max-width: 768px)`);
		mediaQuery.addEventListener('change', checkIfMobile);

		return () => mediaQuery.removeEventListener('change', checkIfMobile);
	}, []);

	const handleSearchTraject = () => {
		console.log('searching trajectory')
	}

	const handleButtonForm = () => {
		return (
			<div className="element relative">
				<button
					type='button'
					onClick={() => setActiveMenu(!activeMenu)}
					className='btn btn_form'
					style={{ minWidth: '12rem', textAlign: 'center' }}
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
		<section id="search_traject">
			<div className="container">
				{isMobile && (
					<div className="wrapper">
						<h1>Search, adventure and share!</h1>
					</div>
				)}
				<div className="wrapper">
					<Form
						formAction={handleSearchTraject}
						inputCount={3}
						placeholder={['Departure', "Destination", "Date"]}
						inputTypes={['text', 'text', 'date']}
						inputName={['depart', "arrival", "date"]}
						buttonName="Search"
						btnClass="btn btn_base"
						children={handleButtonForm()}
					/>
				</div>
			</div>
		</section>
	)
}

export default SearchTraject
import React from 'react'
import Icon from './Icon';

const Dropdown = ({ activeMenu, setActiveMenu, nbrPassenger, setNbrPassenger }) => {
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const checkIfMobile = () => {
			const mediaQuery = window.matchMedia(`(max-width: 768px)`);
			setIsMobile(mediaQuery.matches);
		};

		checkIfMobile();

		const mediaQuery = window.matchMedia(`(max-width: 768px)`);
		mediaQuery.addEventListener('change', checkIfMobile);

		return () => mediaQuery.removeEventListener('change', checkIfMobile);
	}, []);

	return (
		<div className={`dropdown ${activeMenu ? 'active' : 'disabled'}`}>
			{isMobile && activeMenu && (
				<div className="flex j_end" onClick={() => setActiveMenu(!activeMenu)}>
					<Icon type="close" size="3rem" />
				</div>
			)}

			<div className="dropdown_menu">
				<div className="flex between w_100">
					<p className='text_color02'>{nbrPassenger <= 1 ? "Passager" : "Passagers"}</p>
					<div className="flex gap2">
						<button
							className='btn'
							type='button'
							onClick={() => setNbrPassenger(nbrPassenger > 1 ? nbrPassenger - 1 : nbrPassenger)}
						>
							-
						</button>
						<p>{nbrPassenger}</p>
						<button
							className='btn'
							type='button'
							onClick={() => setNbrPassenger(nbrPassenger < 8 ? nbrPassenger + 1 : nbrPassenger)}
						>
							+
						</button>
						<button className='btn' type='button' onClick={() => setActiveMenu(!activeMenu)}>Valider </button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dropdown
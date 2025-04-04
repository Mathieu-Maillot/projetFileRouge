import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../components/utils/Icon';

const Option = ({ options, initialValue, name, placeholder, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(initialValue || '');
	const [isFocused, setIsFocused] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
				setIsFocused(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		setIsOpen(false);
		if (onChange) {
			onChange(option);
		}
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
		setIsFocused(true);
	};

	return (
		<div className="form_element relative" ref={dropdownRef}>
			<div
				className="input_default flex a_center between cursor_pointer"
				onClick={toggleDropdown}
			>
				<div>{selectedOption || 'Choisisser une option'}</div>
				<Icon type={isOpen ? 'chevron-up' : 'chevron-down'} size="1.5rem" />
			</div>

			<label
				htmlFor={name}
				className={`label_default ${selectedOption && !isFocused ? 'label_disabled' : ''}`}
			>
				{placeholder}
			</label>

			{isOpen && (
				<div className="option_default">
					{options && options.map((option, index) => (
						<div
							key={index}
							className="option_item"
							onClick={() => handleOptionClick(option)}
						>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Option;
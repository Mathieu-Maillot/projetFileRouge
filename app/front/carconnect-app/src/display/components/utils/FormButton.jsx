import React, { useState } from 'react'
import Button from '../../components/helpers/Button';
import Input from '../../components/helpers/Input';
import Option from '../../components/helpers/Option';

const FormButton = ({
	title,
	buttonName,
	btnClass = "btn-primary",
	inputName = [],
	inputCount = 0,
	inputTypes = [],
	placeholder = [],
	selectName = [],
	selectOptions = [],
	onSave,
	userData = {}
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState(userData);
	const [activeField, setActiveField] = useState(null);

	const handleInputChange = (name, value) => {
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSelectChange = (name, value) => {
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSave = () => {
		if (onSave) {
			onSave(formData);
		}
		setIsModalOpen(false);
		setActiveField(null);
	};

	const openEditModal = (fieldName, index) => {
		setActiveField({ name: fieldName, index: index });
		setIsModalOpen(true);
	};

	const formatFieldValue = (fieldName, value) => {
		if (fieldName.toLowerCase() === 'driver') {
			return 'Oui'
		}
		else {
			return value || 'Non défini';

		}

	};

	const dataButtons = Array.from({ length: inputCount }, (_, index) => {
		const fieldName = inputName[index];
		const rawValue = userData[fieldName];
		const fieldValue = formatFieldValue(fieldName, rawValue);

		return (
			<div key={`field_${index}`} className="btn_wrapper flex column gap1">
				<span className="field-label">{placeholder[index] || fieldName}: </span>
				<Button
					variant='secondary'
					onClick={() => openEditModal(fieldName, index)}
				>
					{fieldValue}
				</Button>
			</div>
		);
	});

	const isGenderField = activeField && (activeField.name.toLowerCase() === 'gender')
	const defaultGenderOptions = ['Homme', 'Femme', 'Ne se prononce pas'];
	const genderIndex = selectName.findIndex(name => name.toLowerCase() === 'gender');
	const genderOptions = genderIndex !== -1 ? selectOptions[genderIndex] : defaultGenderOptions;
	const isDriverField = activeField && (activeField.name.toLowerCase() === 'driver')
	const defaultDriverOptions = ['Oui', 'Non'];
	const driverIndex = selectName.findIndex(name => name.toLowerCase() === 'driver');
	const driverOptions = driverIndex !== -1 ? selectOptions[driverIndex] : defaultDriverOptions;

	return (
		<>
			<div className="flex column gap2">
				<h2>{buttonName}</h2>
				<div className="form_btn_container">
					{dataButtons}
				</div>
			</div>
			{isModalOpen && activeField && (
				<div className="modal_overlay">
					<div className="modal_content">
						<div className="modal_header">
							<h2>{`${placeholder[activeField.index] || activeField.name}`}</h2>
							<span className="close-button" onClick={() => setIsModalOpen(false)}>&times;</span>
						</div>
						<div className="modal_body">
							{isGenderField ? (
								<Option
									key="gender-option"
									name={activeField.name}
									options={genderOptions}
									initialValue={formData[activeField.name] || ''}
									onChange={(selectedOption) => handleSelectChange(activeField.name, selectedOption)}
								/>
							) : isDriverField ? (
								<Option
									key="driver-option"
									name={activeField.name}
									options={driverOptions}
									initialValue={formData[activeField.name] || ''}
									onChange={(selectedOption) => handleSelectChange(activeField.name, selectedOption)}
								/>
							)
								: (
									<Input
										type={inputTypes[activeField.index]}
										name={activeField.name}
										placeholder={placeholder[activeField.index]}
										defValue={formData[activeField.name] || ''}
										onChange={(e) => handleInputChange(activeField.name, e.target.value)}
									/>
								)}
						</div>
						<div className="modal_footer">
							<Button variant='close' onClick={() => setIsModalOpen(false)}>Annuler</Button>
							<Button variant="success" onClick={handleSave}>Sauvegarder</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default FormButton
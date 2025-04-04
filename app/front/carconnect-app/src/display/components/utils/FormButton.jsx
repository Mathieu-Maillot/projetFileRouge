import React, { useState } from 'react'
import Button from '../../components/helpers/Button';
import Input from '../../components/helpers/Input';

const FormButton = ({
	title,
	buttonName,
	btnClass = "btn-primary",
	inputName = [],
	inputCount = 0,
	inputTypes = [],
	placeholder = [],
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

	const dataButtons = Array.from({ length: inputCount }, (_, index) => {
		const fieldName = inputName[index];
		const fieldValue = userData[fieldName] || 'Not set';

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
							<Input
								type={inputTypes[activeField.index]}
								name={activeField.name}
								placeholder={placeholder[activeField.index]}
								defValue={formData[activeField.name] || ''}
								onChange={(e) => handleInputChange(activeField.name, e.target.value)}
							/>
						</div>
						<div className="modal_footer">
							<Button variant='close' onClick={() => setIsModalOpen(false)}>Cancel</Button>
							<Button variant="success" onClick={handleSave}>Save</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default FormButton
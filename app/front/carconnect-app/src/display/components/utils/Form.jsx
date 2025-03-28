import React, { useState } from 'react';
import Input from '../helpers/Input';
import Button from '../helpers/Button';
const Form = ({ formAction, inputName, inputCount, inputTypes, buttonName, btnClass, placeholder, children }) => {
	const [data, setData] = useState({});

	const inputs = Array.from({ length: inputCount }, (_, index) => (
		<Input key={index} type={inputTypes[index]} name={inputName[index]} placeholder={placeholder[index]} defValue={data[inputName[index]] || ''}
		/>
	));

	return (
		<>
			<form action={formAction}>
				<div className="form_group">
					{inputs}
					{children}
					<div className="form_element flex">
						<Button type="submit" className={btnClass}>{buttonName}</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default Form;
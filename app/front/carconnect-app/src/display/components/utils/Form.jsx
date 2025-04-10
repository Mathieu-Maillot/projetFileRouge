import React, { useState } from 'react';
import Input from '../helpers/Input';
import Button from '../helpers/Button';
import Option from '../helpers/Option';
import CitySearch from '../helpers/CitySearch';

const Form = ({
    title,
    formAction,
    inputName = [],
    inputCount = 0,
    inputTypes = [],
    selectName = [],
    selectCount = 0,
    selectOptions = [],
    buttonName,
    btnClass,
    placeholder = [],
    children,
    formClass
}) => {
    const [data, setData] = useState({});
    
    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toISOString().slice(0, 16);
    };
    
    const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().slice(0, 10);
    };
    
    const handleInputChange = (name, value) => {
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (name, value) => {
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCitySelect = (name, city) => {
        console.log(`City selected for ${name}:`, city.nom);
        setData(prevData => ({
            ...prevData,
            [name]: city.nom
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submission data:", data);
        if (formAction) {
            formAction(data);
        }
    };

    const inputs = Array.from({ length: inputCount }, (_, index) => {
        let defaultValue = data[inputName[index]] || '';

        if (!data[inputName[index]]) {
            if (inputTypes[index] === 'datetime-local') {
                defaultValue = getCurrentDateTime();
            } else if (inputTypes[index] === 'date') {
                defaultValue = getCurrentDate();
            }
        }

        if (inputTypes[index] === 'search') {
            return (
                <div key={`input-${index}`} className="form_element">
                    <CitySearch
                        onSelectCity={(city) => handleCitySelect(inputName[index], city)}
                        placeholder={placeholder[index]}
                    />
                </div>
            );
        }

        return (
            <Input
                key={`input-${index}`}
                type={inputTypes[index]}
                name={inputName[index]}
                placeholder={placeholder[index]}
                defValue={defaultValue}
                onChange={(e) => handleInputChange(inputName[index], e.target.value)}
            />
        );
    });

    const options = Array.from({ length: selectCount }, (_, index) => (
        <Option
            key={`option-${index}`}
            name={selectName[index]}
            options={selectOptions[index]}
            initialValue={data[selectName[index]] || ''}
            onChange={(selectedOption) => handleSelectChange(selectName[index], selectedOption)}
        />
    ));

    return (
        <>
            <form onSubmit={handleSubmit} className={formClass}>
                <h1>{title}</h1>
                <div className="form_group">
                    {inputs}
                    {options}
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
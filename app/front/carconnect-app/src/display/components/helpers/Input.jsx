import React, { useState } from 'react';

const Input = ({ type, initialValue, name, defValue, placeholder }) => {
    const [value, setValue] = useState(initialValue || defValue || '');
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className="form_element relative">
            <input
                type={type}
                value={value}
                name={name}
                id={name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
				placeholder={placeholder}
                className='input_default'
            />
            <label
                htmlFor={name}
                className={`label_default ${value && !isFocused ? 'label_disabled' : ''}`}
            >
            </label>
        </div>
    );
};

export default Input;
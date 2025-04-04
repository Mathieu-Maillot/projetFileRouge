import React, { useState } from 'react';
import Input from '../helpers/Input';
import Button from '../helpers/Button';
import Option from '../helpers/Option';

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

  // Handle input changes
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

  const inputs = Array.from({ length: inputCount }, (_, index) => (
    <Input 
      key={`input-${index}`} 
      type={inputTypes[index]} 
      name={inputName[index]} 
      placeholder={placeholder[index]} 
      defValue={data[inputName[index]] || ''}
      onChange={(e) => handleInputChange(inputName[index], e.target.value)}
    />
  ));

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
      <form action={formAction} className={formClass}>
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
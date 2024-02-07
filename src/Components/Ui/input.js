const TextInput = (
  { fieldName, register, errors, placeHolder, isRequired, maximLength, minimLength,className,fieldtype }
  ) => { 
  
  return ( 
  
  //Input field
  <div className="form-field"> 
  <input 
  className={className}
  type={fieldtype}
  placeholder={placeHolder} 
  {...register[fieldName]}
  {...register(fieldName, { 
  required: { 
  value: isRequired, 
  message: "This is required", 
  }, 
  maxLength: { 
  value: maximLength, 
  message: `Value must be maximum ${maximLength}`, 
  }, 
  minLength: { 
  value: minimLength, 
  message: `Value must be minimum ${minimLength}`, 
  }, 
  }
  )} 
  /> 
  <p> { 
  //Shows if error exist
  errors[fieldName] && errors[fieldName].message 
  } </p> 
  </div> ); 
  }; 
  
  export default TextInput;
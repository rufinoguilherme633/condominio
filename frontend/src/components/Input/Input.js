function Input({ type, id_input, name, placeholder, text, onChange, value, required = false, className }) {
  return (
    <>
  <div  style={{ display: "flex", flexDirection: "column", gap: "0.3rem" ,width:"90%"}}>
        <label>{text}</label>
      <input
        type={type}
        id={id_input}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...(value !== undefined ? { value } : {})}
        required={required}
        className={className}
      />
  </div>
    </>
  );
}

export default Input;
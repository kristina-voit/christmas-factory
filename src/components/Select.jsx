function Select({ name, value, children, options, onSelectChange }) {
  return (
    <>
      <label htmlFor={name}>{children}</label>
      <select value={value} onChange={onSelectChange} name={name} id={name}>
        <option value="">–– Please choose ––</option>
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;

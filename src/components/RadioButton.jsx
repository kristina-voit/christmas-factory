function RadioButton({ value, children, onRadioChange }) {
  return (
    <span>
      {children}
      <label>
        <input
          type="radio"
          value="small"
          checked={value === 'small'}
          onChange={onRadioChange}
          name="packageSize"
        />
        S
      </label>
      <label>
        <input
          type="radio"
          value="medium"
          checked={value === 'medium'}
          onChange={onRadioChange}
          name="packageSize"
        />
        M
      </label>
      <label>
        <input
          type="radio"
          value="large"
          checked={value === 'large'}
          onChange={onRadioChange}
          name="packageSize"
        />
        L
      </label>
    </span>
  );
}

export default RadioButton;

export default function Checkbox({ name, value, onCheckboxChange, children }) {
  return (
    <label style={{ paddingTop: '0.8rem' }}>
      <input
        type="checkbox"
        name={name}
        id={name}
        onChange={onCheckboxChange}
        checked={value}
      />{' '}
      {children}
    </label>
  );
}

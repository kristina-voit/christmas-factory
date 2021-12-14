import styled from 'styled-components/macro';

function RadioButton({ value, children, onRadioChange }) {
  return (
    <section>
      <label>{children}</label>
      <Radios>
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
      </Radios>
    </section>
  );
}

export default RadioButton;

const Radios = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

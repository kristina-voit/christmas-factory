import './App.css';
import styled from 'styled-components';
import { useState } from 'react';
import TextInput from './components/TextInput';
import NumberInput from './components/NumberInput';
import Checkbox from './components/Checkbox';
import Select from './components/Select';
import RadioButton from './components/RadioButton';

function App() {
  const initialProduct = {
    name: '',
    price: 0,
    isDecorated: false,
    category: '',
    packageSize: '',
    contactEmail: '',
  };
  const [product, setProduct] = useState(initialProduct);

  const [products, setProducts] = useState([]);

  const categories = [
    'Tee',
    'Lebkuchen',
    'Kekse',
    'Adventskalender',
    'Liköre & Spirituosen',
  ];

  const handleChange = (event) => {
    let inputValue = event.target.value; // "Glühwein"

    if (event.target.type === 'checkbox') {
      inputValue = event.target.checked;
    }

    // if (event.target.name === 'price') { parseInt }

    setProduct({
      // alle bestehenden Properties behalten
      // neu zu setzende Property -> deren Wert überschreiben
      ...product,
      [event.target.name]: inputValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProducts([...products, product]);
    setProduct(initialProduct);
  };

  return (
    <Container>
      <h2>🎄 Add a new product 🍪</h2>
      <Form onSubmit={handleSubmit}>
        <TextInput
          onTextInputChange={handleChange}
          name="name"
          value={product.name}
        >
          Product Name
        </TextInput>

        <InputRow>
          <div>
            <NumberInput
              name="price"
              value={product.price}
              onNumberInputChange={handleChange}
            >
              Price (in €)
            </NumberInput>
          </div>

          <Checkbox
            name="isDecorated"
            value={product.isDecorated}
            onCheckboxChange={handleChange}
          >
            decorated
          </Checkbox>
        </InputRow>

        <Select
          name="category"
          value={product.category}
          options={categories}
          onSelectChange={handleChange}
        >
          Product Category
        </Select>

        <RadioButton value={product.packageSize} onRadioChange={handleChange}>
          Package Size
        </RadioButton>

        <TextInput
          name="contactEmail"
          value={product.contactEmail}
          onTextInputChange={handleChange}
          placeholder="Add your email …"
        >
          Contact Email
        </TextInput>

        <div>
          <button>Add Product</button>
          {/* Optional */}
          <button type="reset" onClick={() => setProduct(initialProduct)}>
            Reset
          </button>
        </div>
      </Form>

      {products.map((product) => (
        <article>
          <h3>{product.name}</h3>
          <p>
            {product.category} // {product.price} €
          </p>
        </article>
      ))}
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 24rem;
  margin: 0 auto;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  background: #620202;
  padding: 0.7rem 0.5rem 1.2rem;
  border-radius: 10px;

  label {
    display: block;
    font-weight: bold;
  }
  input,
  select {
    padding: 0.25rem;
    margin: 0.5rem 0 1rem;
  }

  button {
    background: var(--button-bg);
    border: 2px solid var(--button-bg);
    border-radius: 5px;
    color: var(--primary-color);
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.5rem;
    width: 49%;
  }
  button:first-child {
    margin-right: 2%;
  }
  button:nth-child(even) {
    background: transparent;
  }
`;

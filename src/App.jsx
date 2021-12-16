import './App.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import TextInput from './components/TextInput';
import NumberInput from './components/NumberInput';
import Checkbox from './components/Checkbox';
import Select from './components/Select';
import RadioButton from './components/RadioButton';

import isProductValid from './lib/validation';
import { saveToLocal, loadFromLocal } from './lib/localStorage';

function App() {
  const initialProduct = {
    name: '',
    price: 0,
    isDecorated: false,
    category: '',
    packageSize: '',
    contactEmail: '',
    tags: [],
  };
  const [product, setProduct] = useState(initialProduct);

  const localStorageProducts = loadFromLocal('_products');
  const [products, setProducts] = useState(localStorageProducts ?? []);

  const [hasFormErrors, setHasFormErrors] = useState(false);

  useEffect(() => {
    saveToLocal('_products', products);
  }, [products]);

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
    if (isProductValid(product)) {
      setProducts([...products, product]);
      // setProduct(initialProduct);
      setHasFormErrors(false);
    } else {
      setHasFormErrors(true);
    }
  };

  return (
    <Container>
      <section>
        <h2>🎄 Add a new product 🍪</h2>
        {hasFormErrors && (
          <ErrorMessage>
            <div>
              🎅🏽
              <div className="bubble">🗯</div>
            </div>
            <p>
              <strong>Ho ho ho! </strong>
              Please check if all fields are correctly filled.
            </p>
          </ErrorMessage>
        )}
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
            <button
              type="reset"
              onClick={() => {
                setProduct(initialProduct);
                setHasFormErrors(false);
              }}
            >
              Reset
            </button>
          </div>
        </Form>
      </section>

      <CardTree>
        {products.map((product, index) => (
          <article
            className={'area' + (index < 10 ? index + 1 : '')}
            style={
              index > 9 ? { gridRowStart: Math.floor((index - 2) / 4) + 3 } : {}
            }
          >
            <h3>{product.name}</h3>
            <p>
              {product.category} // {product.price} €
            </p>
          </article>
        ))}
      </CardTree>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 38% auto;
  grid-template-rows: 1fr;
  height: 100%;
  margin: 0 auto;
  width: 80%;
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

const ErrorMessage = styled.div`
  align-items: center;
  background: var(--warning);
  border-radius: 6px;
  color: white;
  display: flex;
  gap: 2.5rem;
  margin: 0 0 1rem;
  padding: 0.5rem;

  div {
    font-size: 2.5rem;
    display: inline-block;
    position: relative;
    transition: all 0.5s;
  }
  div:hover {
    transform: rotateZ(20deg);
  }

  div.bubble {
    font-size: 3rem;

    position: absolute;
    top: -17px;
    right: -38px;
  }
`;

const CardTree = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: repeat(10, 1fr);
  grid-auto-flow: row;
  gap: 10px 10px;
  grid-template-areas:
    '. . . area1 area1 . . .'
    '. . area2 area2 area3 area3 . .'
    '. area4 area4 area5 area5 area6 area6 .'
    'area7 area7 area8 area8 area9 area9 area10 area10';
  padding: 6rem;

  article {
    background: var(--secondary-color);
    border-radius: 8px;
    grid-column: span 2;
  }
  article:hover {
    background: var(--primary-color);
    color: var(--secondary-color);
  }

  .area1 {
    grid-area: area1;
  }
  .area2 {
    grid-area: area2;
  }
  .area3 {
    grid-area: area3;
  }
  .area4 {
    grid-area: area4;
  }
  .area5 {
    grid-area: area5;
  }
  .area6 {
    grid-area: area6;
  }
  .area7 {
    grid-area: area7;
  }
  .area8 {
    grid-area: area8;
  }
  .area9 {
    grid-area: area9;
  }
  .area10 {
    grid-area: area10;
  }

  .area {
  }
`;

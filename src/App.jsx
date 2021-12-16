import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductForm from './components/ProductForm';

import './App.css';

import { saveToLocal, loadFromLocal } from './lib/localStorage';

function App() {
  const localStorageProducts = loadFromLocal('_products');
  const [products, setProducts] = useState(localStorageProducts ?? []);

  useEffect(() => {
    saveToLocal('_products', products);
  }, [products]);

  const addProduct = (product) => setProducts([...products, product]);

  return (
    <Container>
      <ProductForm onAddProduct={addProduct} />
      <CardTree>
        {products.map((product, index) => (
          <article
            key={index}
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

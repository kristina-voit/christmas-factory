import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductForm from './components/ProductForm';

import './App.css';

import { saveToLocal, loadFromLocal } from './lib/localStorage';

function App() {
  const localStorageProducts = loadFromLocal('_products'); //Variable für die Funktion, die die manuell hinzugefügten Produkte aus dem Local Storage lädt
  const localStorageFavouriteProducts = loadFromLocal('_favouriteProducts'); //Variable für die Funktion, die die als Favoriten gekennzeichneten Produkte aus dem Local Storage lädt

  const [products, setProducts] = useState(localStorageProducts ?? []);
  const [favouriteProducts, setFavouriteProducts] = useState(localStorageFavouriteProducts ?? []);

  useEffect(() => {
    saveToLocal('_products', products);
  }, [products]); // Wird nach jedem Mount ausgeführt, hinzugefügtes Produkt wird im Local Storage gespeichert

  useEffect(() => {
    saveToLocal('_favouriteProducts', favouriteProducts);
  }, [favouriteProducts]); // Wird nach jedem Mount ausgeführt, hinzugefügter Favorit wird im Local Storage gespeichert

  const addProduct = (product) => setProducts([...products, product]); // Variable für das Hinzufügen eines Produkts zu den bestehenden Produkten

  function isProductInListOfFavourites(favouriteProductToAdd) { // Wenn Favorit schon als Favorit markiert ist, gebe ihm die ID
    return favouriteProducts.some(
      (everyFavouriteProduct) =>
        everyFavouriteProduct.id === favouriteProductToAdd.id
    );
  }

  function removeProductFromListOfFavourites(product) {
    // Entferne den Favoriten von der Favoritenliste und gebe alle Favoriten-IDs außer der entfernten Favoriten-ID wieder
    return favouriteProducts.filter(
      (everyFavouriteProduct) => everyFavouriteProduct.id !== product.id
    );
  }

  function addToFavourites(favouriteProductToAdd) {
    // Produkt ist schon auf der Liste der Favourites => Entfernen!
    if (isProductInListOfFavourites(favouriteProductToAdd)) {
      const favouritesToKeep = removeProductFromListOfFavourites(favouriteProductToAdd);setFavouriteProducts(favouritesToKeep);
    } else {
      // Produkt ist noch NICHT auf der Liste der Favourites => Hinzufügen!
      setFavouriteProducts([...favouriteProducts, favouriteProductToAdd]);
    }
  }

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
            <FavouriteIcon onClick={() => addToFavourites(product)}> 
          {/*Per Klick auf Favoriten-Stern: Produkt kommt zu Favoriten und bekommt gelben Stern, ansonsten leeren Stern*/}
              {isProductInListOfFavourites(product) ? '⭐️' : '✩'}
            </FavouriteIcon>
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
  grid-auto-rows: 10rem;
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
    padding: 0 1rem 0.5rem;
    position: relative;
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
`;

const FavouriteIcon = styled.span`
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

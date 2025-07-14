import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState([]);

  // Load from AsyncStorage when the app starts
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const stored = await AsyncStorage.getItem('favourites');
        if (stored) {
          setFavouriteItems(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Failed to load favourites:', err);
      }
    };
    loadFavourites();
  }, []);

  // Save to AsyncStorage when favourites change
  useEffect(() => {
    const saveFavourites = async () => {
      try {
        await AsyncStorage.setItem('favourites', JSON.stringify(favouriteItems));
      } catch (err) {
        console.error('Failed to save favourites:', err);
      }
    };
    saveFavourites();
  }, [favouriteItems]);

  const addFavourite = (item) => {
    const exists = favouriteItems.some(
      (fav) => fav.variantId === item.variantId && fav.size === item.size
    );
    if (!exists) {
      setFavouriteItems((prev) => [...prev, item]);
    }
  };

  const removeFavourite = (variantId, size) => {
    const filtered = favouriteItems.filter(
      (item) => !(item.variantId === variantId && item.size === size)
    );
    setFavouriteItems(filtered);
  };

  const isFavourite = (variantId, size) => {
    return favouriteItems.some(
      (item) => item.variantId === variantId && item.size === size
    );
  };

  return (
    <FavouriteContext.Provider
      value={{ favouriteItems, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouriteContext);

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Context
const FavouriteContext = createContext();

// Provider
export const FavouriteProvider = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState([]);

  // Load from AsyncStorage on mount
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const stored = await AsyncStorage.getItem('favourites');
        if (stored) {
          setFavouriteItems(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load favourites:', error);
      }
    };

    loadFavourites();
  }, []);

  // Save to AsyncStorage whenever favourites change
  useEffect(() => {
    const saveFavourites = async () => {
      try {
        await AsyncStorage.setItem('favourites', JSON.stringify(favouriteItems));
      } catch (error) {
        console.error('Failed to save favourites:', error);
      }
    };

    saveFavourites();
  }, [favouriteItems]);

  // Add item if not exists (by id + size)
  const addFavourite = (item) => {
    const exists = favouriteItems.some(
      (fav) => fav.variantId === item.variantId && fav.size === item.size
    );
    if (!exists) {
      setFavouriteItems((prev) => [...prev, item]);
    }
  };

  // Remove item by id + size
  const removeFavourite = (variantId, size) => {
    const filtered = favouriteItems.filter(
      (item) => !(item.variantId === variantId && item.size === size)
    );
    setFavouriteItems(filtered);
  };

  // Check if item is favourited
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

// Hook
export const useFavourites = () => useContext(FavouriteContext);

// CartContext.native.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shopifyQuery } from '../api/shopifyClient';
import {
  CREATE_CART,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
  GET_CART,
} from '../graphql/mutation';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const loadCartId = async () => {
      const storedId = await AsyncStorage.getItem('cartId');
      if (storedId) setCartId(storedId);
    };
    loadCartId();
  }, []);

  useEffect(() => {
    if (cartId) fetchCart();
  }, [cartId]);

  useEffect(() => {
    if (cartId) AsyncStorage.setItem('cartId', cartId);
  }, [cartId]);

  const addToCart = async (item) => {
    const line = {
      merchandiseId: item.variantId,
      quantity: item.quantity || 1,
      attributes: [{ key: 'size', value: item.size || 'Default' }],
    };

    try {
      let data;
      if (!cartId) {
        data = await shopifyQuery(CREATE_CART, { input: { lines: [line] } });
        const newCart = data.cartCreate.cart;
        setCartId(newCart.id);
        syncCartItems(newCart.lines.edges);
      } else {
        data = await shopifyQuery(CART_LINES_ADD, { cartId, lines: [line] });
        const updatedCart = data.cartLinesAdd.cart;
        syncCartItems(updatedCart.lines.edges);
      }
    } catch (error) {
      console.error('Add to cart failed:', error);
    }
  };

  const syncCartItems = (lines) => {
    const updated = lines.map(({ node }) => {
      const sizeAttr = node.attributes?.find(attr => attr.key === 'size');
      const merchandise = node.merchandise;
      const price = parseFloat(merchandise?.priceV2?.amount || 0);
      return {
        lineId: node.id,
        variantId: merchandise?.id,
        quantity: node.quantity,
        size: sizeAttr?.value || 'Default',
        title: merchandise?.product?.title || 'Untitled',
        price,
        image: merchandise?.image?.url || '',
      };
    });
    setCartItems(updated);
  };

  const fetchCart = async () => {
    if (!cartId) return;
    try {
      const data = await shopifyQuery(GET_CART, { cartId });
      if (!data?.cart) {
        await AsyncStorage.removeItem('cartId');
        setCartId(null);
        return;
      }
      syncCartItems(data.cart.lines.edges);
    } catch (error) {
      console.error('Fetch cart failed:', error);
    }
  };

  const updateQuantity = async (lineId, newQuantity) => {
    if (!cartId || !lineId) return;
    try {
      const data = await shopifyQuery(CART_LINES_UPDATE, {
        cartId,
        lines: [{ id: lineId, quantity: newQuantity }],
      });
      syncCartItems(data.cartLinesUpdate.cart.lines.edges);
    } catch (error) {
      console.error('Update quantity failed:', error);
    }
  };

  const removeLine = async (lineId) => {
    if (!cartId || !lineId) return;
    try {
      const data = await shopifyQuery(CART_LINES_REMOVE, {
        cartId,
        lineIds: [lineId],
      });
      syncCartItems(data.cartLinesRemove.cart.lines.edges);
    } catch (error) {
      console.error('Remove line failed:', error);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartId,
        addToCart,
        updateQuantity,
        removeLine,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

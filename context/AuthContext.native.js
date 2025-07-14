import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../config/shopifyConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [shopifyToken, setShopifyToken] = useState(null);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const shopifyCustomerToken = await AsyncStorage.getItem('shopifyCustomerToken');

        if (token) {
          try {
            const decoded = jwtDecode(token);
            setUser(decoded);
          } catch (err) {
            await AsyncStorage.multiRemove(['userToken', 'user']);
            setUser(null);
          }
        }

        if (shopifyCustomerToken) {
          setShopifyToken(shopifyCustomerToken);
        }
      } catch (err) {
        console.error('Error loading auth tokens:', err);
      }
    };

    loadTokens();
  }, []);

  const loginToShopify = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/shopify/customer/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to login to Shopify');

      await AsyncStorage.setItem('shopifyCustomerToken', data.token);
      setShopifyToken(data.token);
    } catch (err) {
      console.error('Shopify login failed:', err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'user', 'shopifyCustomerToken']);
      setUser(null);
      setShopifyToken(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

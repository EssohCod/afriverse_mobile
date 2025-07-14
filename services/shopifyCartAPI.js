// services/shopifyCartAPI.js
import { CREATE_CART, CART_LINES_ADD, GET_CART, CART_LINES_UPDATE, CART_LINES_REMOVE } from '../graphql/mutation';
import { SHOPIFY_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../config/shopifyConfig';

const shopifyFetch = async (query, variables = {}) => {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors || json.data?.userErrors?.length > 0) {
    console.error('Shopify API Error:', json.errors || json.data.userErrors);
  }
  return json.data;
};

// 🔸 Create Cart
export const createCart = async (variantId, quantity = 1) => {
  const input = {
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      },
    ],
  };
  const data = await shopifyFetch(CREATE_CART, { input });
  return data.cartCreate?.cart;
};

// 🔸 Add to Cart
export const addToCart = async (cartId, variantId, quantity = 1) => {
  const lines = [{ merchandiseId: variantId, quantity }];
  const data = await shopifyFetch(CART_LINES_ADD, { cartId, lines });
  return data.cartLinesAdd?.cart;
};

// 🔸 Get Cart
export const getCart = async (cartId) => {
  const data = await shopifyFetch(GET_CART, { cartId });
  return data.cart;
};

// 🔸 Update Cart Line
export const updateCartLine = async (cartId, lineId, quantity) => {
  const lines = [{ id: lineId, quantity }];
  const data = await shopifyFetch(CART_LINES_UPDATE, { cartId, lines });
  return data.cartLinesUpdate?.cart;
};

// 🔸 Remove from Cart
export const removeFromCart = async (cartId, lineIds) => {
  const data = await shopifyFetch(CART_LINES_REMOVE, { cartId, lineIds });
  return data.cartLinesRemove?.cart;
};

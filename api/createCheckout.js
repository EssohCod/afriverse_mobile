
// src/api/createCheckout.js

import { shopifyQuery } from "./shopifyClient";

export async function createShopifyCheckout(cartItems) {
  const lineItems = cartItems.map((item) => ({
    variantId: item.variantId,
    quantity: item.quantity,
    
  }));

  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems,
    },
  };

  const data = await shopifyQuery(query, variables);

  if (data.checkoutCreate.userErrors.length > 0) {
    console.error("Checkout userErrors:", data.checkoutCreate.userErrors);
    throw new Error(data.checkoutCreate.userErrors[0].message);
  }

  return data.checkoutCreate.checkout.webUrl;
}

// api/shopifyClient.js

import Constants from 'expo-constants';

const {
  SHOPIFY_DOMAIN,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN
} = Constants.expoConfig.extra;

export async function shopifyQuery(query, variables = {}) {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    console.error("🛑 Shopify top-level errors:", JSON.stringify(result.errors, null, 2));
    throw new Error("Shopify query failed");
  }

  console.log("✅ SHOPIFY_DOMAIN:", SHOPIFY_DOMAIN);
  console.log("✅ SHOPIFY_STOREFRONT_ACCESS_TOKEN:", SHOPIFY_STOREFRONT_ACCESS_TOKEN);

  return result.data;
}


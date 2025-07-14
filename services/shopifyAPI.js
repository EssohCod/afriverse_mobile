// services/shopifyAPI.js
import { SHOPIFY_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../config/shopifyConfig';

export const fetchProductsByTag = async (tag) => {
  const query = `
    {
      products(first: 20, query: "tag:${tag}") {
        edges {
          node {
            id
            title
            tags
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  return json.data.products.edges.map(edge => {
    const product = edge.node;
    return {
      id: product.id,
      name: product.title,
      image: product.images.edges[0]?.node.url || null,
      price: parseFloat(product.variants.edges[0]?.node.price.amount || '0'),
      tags: product.tags,
    };
  });
};

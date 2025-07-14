import React, { createContext, useContext, useEffect, useState } from 'react';
import { shopifyQuery } from '../api/shopifyClient';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);
  const [pageInfo, setPageInfo] = useState({ endCursor: null, hasNextPage: false });

  const PRODUCT_QUERY = (afterCursor) => `
    query getProducts {
      products(first: 20${afterCursor ? `, after: "${afterCursor}"` : ''}) {
        edges {
          cursor
          node {
            id
            title
            description
            productType
            tags
            totalInventory
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const formatProducts = (edges) => {
    return edges.map(({ node }) => {
      const variant = node.variants.edges[0]?.node || {};
      return {
        id: node.id,
        name: node.title,
        description: node.description,
        image: node.images.edges[0]?.node.url || '',
        imageAlt: node.images.edges[0]?.node.altText || '',
        price: parseFloat(variant.price?.amount || 0),
        currency: variant.price?.currencyCode || 'USD',
        variantId: variant.id,
        category: node.productType || 'General',
        tags: node.tags || [],
        inventory: node.totalInventory || 0,
        quantityAvailable: variant.quantityAvailable || 0,
        variantTitle: variant.title || '',
      };
    });
  };

  const fetchInitialProducts = async () => {
    setLoadingProducts(true);
    setError(null);
    try {
      const data = await shopifyQuery(PRODUCT_QUERY());
      const edges = data.products.edges;
      const pageInfo = data.products.pageInfo;

      setProducts(formatProducts(edges));
      setPageInfo(pageInfo);
    } catch (err) {
      console.error('Fetch initial products failed:', err);
      setError(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!pageInfo.hasNextPage) return;

    try {
      const data = await shopifyQuery(PRODUCT_QUERY(pageInfo.endCursor));
      const edges = data.products.edges;
      const newPageInfo = data.products.pageInfo;

      setProducts((prev) => [...prev, ...formatProducts(edges)]);
      setPageInfo(newPageInfo);
    } catch (err) {
      console.error('Load more products failed:', err);
      setError(err);
    }
  };

  useEffect(() => {
    fetchInitialProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loadingProducts,
        error,
        popularProducts: products.filter(p => p.tags.includes('popular')),
        newProducts: products.filter(p => p.tags.includes('new')),
        loadMoreProducts,
        hasMoreProducts: pageInfo.hasNextPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

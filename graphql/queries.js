// graphql/queries.js
export const GET_PRODUCTS_BY_TAG = `
  query getProductsByTag($query: String!) {
    products(first: 10, query: $query) {
      edges {
        node {
          id
          title
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
                id
                price {
                  amount
                }
              }
            }
          }
          totalInventory
        }
      }
    }
  }
`;

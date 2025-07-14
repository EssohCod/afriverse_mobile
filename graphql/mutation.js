// // src/graphql/mutations.js

// // ✅ Create a cart
// export const CREATE_CART = `
//   mutation cartCreate($input: CartInput!) {
//     cartCreate(input: $input) {
//       cart {
//         id
//         checkoutUrl
//         lines(first: 50) {
//           edges {
//             node {
//               id
//               quantity
//               attributes {
//                 key
//                 value
//               }
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title
//                   availableForSale        # ✅ New
//                   quantityAvailable        # ✅ New
//                   priceV2 {
//                     amount
//                     currencyCode
//                   }
//                   image {
//                     url
//                   }
//                   product {
//                     title
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `;

// // ✅ Add line(s) to an existing cart
// export const CART_LINES_ADD = `
//   mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
//     cartLinesAdd(cartId: $cartId, lines: $lines) {
//       cart {
//         id
//         checkoutUrl
//         lines(first: 50) {
//           edges {
//             node {
//               id
//               quantity
//               attributes {
//                 key
//                 value
//               }
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title
//                   availableForSale        # ✅
//                   quantityAvailable        # ✅
//                   priceV2 {
//                     amount
//                     currencyCode
//                   }
//                   image {
//                     url
//                   }
//                   product {
//                     title
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `;

// // ✅ Get cart details
// export const GET_CART = `
//   query getCart($cartId: ID!) {
//     cart(id: $cartId) {
//       id
//       checkoutUrl
//       lines(first: 50) {
//         edges {
//           node {
//             id
//             quantity
//             attributes {
//               key
//               value
//             }
//             merchandise {
//               ... on ProductVariant {
//                 id
//                 title
//                 priceV2 {
//                   amount
//                   currencyCode
//                 }
//                 image {
//                   url
//                 }
//                 product {
//                   title
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// // ✅ Update line(s) quantity
// export const CART_LINES_UPDATE = `
//   mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
//     cartLinesUpdate(cartId: $cartId, lines: $lines) {
//       cart {
//         id
//         checkoutUrl
//         lines(first: 50) {
//           edges {
//             node {
//               id
//               quantity
//               attributes {
//                 key
//                 value
//               }
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title
//                   priceV2 {
//                     amount
//                     currencyCode
//                   }
//                   image {
//                     url
//                   }
//                   product {
//                     title
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `;

// // ✅ Remove line(s)
// export const CART_LINES_REMOVE = `
//   mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
//     cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
//       cart {
//         id
//         checkoutUrl
//         lines(first: 50) {
//           edges {
//             node {
//               id
//               quantity
//               attributes {
//                 key
//                 value
//               }
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title
//                   priceV2 {
//                     amount
//                     currencyCode
//                   }
//                   image {
//                     url
//                   }
//                   product {
//                     title
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `;
// export const GET_PRODUCTS_BY_TAG = `
//   query GET_PRODUCTS_BY_TAG($tag: String!) {
//     products(first: 20, query: $tag) {
//       edges {
//         node {
//           id
//           title
//           images(first: 1) {
//             edges {
//               node {
//                 url
//               }
//             }
//           }
//           variants(first: 1) {
//             edges {
//               node {
//                 id
//                 title
//                 availableForSale
//                 quantityAvailable
//                 price {
//                   amount
//                 }
//               }
//             }
//           }
//           totalInventory
//         }
//       }
//     }
//   }
// `;




export const CREATE_CART = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_ADD = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const GET_CART = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            attributes {
              key
              value
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                image {
                  url
                }
                product {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CART_LINES_UPDATE = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_REMOVE = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const GET_PRODUCTS = `
  {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
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
                title
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
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
            title
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

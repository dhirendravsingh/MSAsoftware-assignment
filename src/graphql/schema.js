const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Place {
    name: String
    address: String
    rating: Float
    phone: String
  }

  type Query {
    searchPizza: [Place]
    searchJuice: [Place]
    searchCombo: [Place]
  }
`;

module.exports = typeDefs;

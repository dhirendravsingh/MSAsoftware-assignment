const request = require('supertest');
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const searchRoutes = require('../src/controllers/searchController');
const typeDefs = require('../src/graphql/schema');
const resolvers = require('../src/graphql/resolver');
const axios = require('axios');

// Mock axios
jest.mock('axios');

let app;
let server;

// Mock response data
const mockPlacesResponse = {
  data: {
    results: [
      {
        name: "Test Place",
        location: {
          address: "123 Test St"
        },
        rating: 4.5,
        phone: "123-456-7890"
      }
    ]
  }
};

// Setup function that runs before all tests
beforeAll(async () => {
  app = express();
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  await server.start();
  
  app.use(express.json());
  app.use('/search', searchRoutes);
  app.use('/graphql', expressMiddleware(server));
});

// Reset mocks before each test
beforeEach(() => {
  axios.request.mockReset();
  axios.request.mockResolvedValue(mockPlacesResponse);
});

// Cleanup after tests
afterAll(async () => {
  await server.stop();
});

describe('REST API Endpoints', () => {
  describe('GET /search/pizza', () => {
    it('should return pizza places', async () => {
      const res = await request(app)
        .get('/search/pizza')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining('categories=pizza')
        })
      );
    });

    it('should handle API errors', async () => {
      axios.request.mockRejectedValue(new Error('API Error'));

      const res = await request(app)
        .get('/search/pizza')
        .expect(500);

      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  describe('GET /search/juice', () => {
    it('should return juice places', async () => {
      const res = await request(app)
        .get('/search/juice')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining('categories=juice')
        })
      );
    });
  });

  describe('GET /search/combo', () => {
    it('should return combo places', async () => {
      const res = await request(app)
        .get('/search/combo')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining('categories=pizza,juice')
        })
      );
    });
  });
});

describe('GraphQL Endpoints', () => {
  it('should fetch pizza places via GraphQL', async () => {
    const query = `
      query {
        searchPizza {
          name
          address
          rating
          phone
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(axios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining('categories=pizza')
      })
    );
  });

  it('should fetch juice places via GraphQL', async () => {
    const query = `
      query {
        searchJuice {
          name
          address
          rating
          phone
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(axios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining('categories=juice')
      })
    );
  });

  it('should fetch combo places via GraphQL', async () => {
    const query = `
      query {
        searchCombo {
          name
          address
          rating
          phone
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(axios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining('categories=pizza,juice')
      })
    );
  });

  it('should handle GraphQL validation errors', async () => {
    const invalidQuery = `
      query {
        searchPizza {
          invalidField
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query: invalidQuery })
      .expect(400);

    expect(response.body.errors).toBeDefined();
  });
});
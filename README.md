Backend Challenge - Find Nearby Pizza and Juice Shops

#Overview

-This project is a backend service that provides information about nearby pizza and juice shops. It exposes both RESTful APIs and GraphQL APIs to fetch data. Since the Yelp API is not functional in India, this project uses the Foursquare API to fetch places that serve pizza, juice, or both.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#Tech Stack

-Node.js - Backend framework

-Express.js - Web server

-Apollo Server - GraphQL implementation

-Axios - For making API calls to Foursquare

-Winston - Logging

-Jest - For unit and integration testing

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#Folder Structure

/project-root
├── src/
│   ├── controllers/        # REST API Controllers
│   ├── graphql/            # GraphQL Schema & Resolvers
│   ├── services/           # Business logic & API calls
│
├── tests/                  # Test cases
└── app.js                  # Entry point of the application

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#Installation

Clone the repository:

bash
git clone https://github.com/your-repo.git
cd project-root
Install dependencies:

bash
npm install

Set up environment variables by creating a .env file:

FOURSQUARE_API_KEY=your_api_key_here
Start the server:

bash
npm start

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#REST API Endpoints

Method	Endpoint	Description
-GET	/search/pizza	Get places offering pizza
-GET	/search/juice	Get places offering juice
-GET	/search/combo	Get places offering both

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#GraphQL API

Schema Definition
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


#GraphQL Endpoint
http://localhost:9000/graphql

Example Query
query {
  searchPizza {
    name
    address
    rating
    phone
  }
}

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#Code Explanation

app.js
-Initializes Express.js and applies CORS & JSON parsing middleware.

-Sets up REST routes (/search) and GraphQL endpoint (/graphql).

-Starts the Apollo Server for handling GraphQL queries.

controllers/searchController.js
-Handles REST API requests and calls the Foursquare API.

graphql/schema.js
-Defines GraphQL types and queries.

graphql/resolvers.js
Implements resolvers to fetch data from the Foursquare API.

services/foursquareService.js
-Contains functions to fetch data from the Foursquare API.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#Why Foursquare API?

-The Yelp API is not available in India.

-Foursquare API provides similar functionality for finding places based on categories.

-API calls are made using Axios to fetch pizza, juice, and combo locations.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#Testing

Tests are written using Jest. To run tests:
npm test

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#Future Improvements

-Implement rate limiting for API requests.

-Add Docker support for containerized deployment.

-Improve error handling and logging using Winston.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#Conclusion

-This backend service efficiently fetches nearby pizza and juice places using the Foursquare API. It supports both REST and GraphQL APIs, making it flexible and scalable for future enhancements.

-Feel free to copy and paste this into your README.md file! Let me know if you need further assistance. 
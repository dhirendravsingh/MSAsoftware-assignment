const axios = require("axios");

const API_KEY = "fsq3r1r3SM1GJURYa22HVi4hwjaRn3aSWGIDHQX6L9EVsao=";
const BASE_URL = "https://api.foursquare.com/v3/places/search";

async function fetchPlaces(category) {
  const options = {
    method: 'GET',
    url: `${BASE_URL}?categories=${category}`,
    headers: {
      accept: 'application/json',
      Authorization: API_KEY
    }
  };
  axios
    .request(options)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}

module.exports = {
    fetchPizzaPlaces: () => fetchPlaces("pizza"),
    fetchJuicePlaces: () => fetchPlaces("juice"),
    fetchComboPlaces: () => fetchPlaces("pizza,juice")
};

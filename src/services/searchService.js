
const axios = require("axios");

const API_KEY = "fsq30umAWsCo5CygUCL2WLZZ7p+TFqVM/J/YgPVZQPJ8HhI";
const BASE_URL = "https://api.foursquare.com/v3/places/search";

async function fetchPlaces(category) {
    const response = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: { term: category, location: "Delhi", limit: 5 }
    });
    return response.data.businesses.map(b => ({
        name: b.name,
        address: b.location.address1,
        rating: b.rating,
        phone: b.phone
    }));
}

module.exports = {
    fetchPizzaPlaces: () => fetchPlaces("pizza"),
    fetchJuicePlaces: () => fetchPlaces("juice"),
    fetchComboPlaces: () => fetchPlaces("pizza,juice")
};

const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://api.foursquare.com/v3/places/search',
  headers: {
    accept: 'application/json',
    Authorization: 'fsq30umAWsCo5CygUCL2WLZZ7p+TFqVM/J/YgPVZQPJ8HhI='
  }
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
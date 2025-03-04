const searchService = require("../services/searchService");

const resolvers = {
  Query: {
    searchPizza: async () => await searchService.fetchPizzaPlaces(),
    searchJuice: async () => await searchService.fetchJuicePlaces(),
    searchCombo: async () => await searchService.fetchComboPlaces(),
  }
};

module.exports = resolvers;

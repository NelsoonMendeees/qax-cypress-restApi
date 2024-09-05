const { defineConfig } = require("cypress");
const { configurePlugin } = require("cypress-mongodb");
const dotenv = require("dotenv");
dotenv.config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    baseUrl: "http://localhost:5000/api",
    watchForFileChanges: false,
  },
  env: {
    mongodb: {
      uri: process.env.MONGO_URI,
      database: process.env.MONGO_DATABASE,
      collection: process.env.MONGO_COLLECTION,
    },
  },
});

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://spartantest-puppies.herokuapp.com',
    specPattern: 'cypress/tests/*.spec.cy.js',
    fixturesFolder: 'cypress/fixtures',
    defaultCommandTimeout: 30000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    video: false,
  },
});

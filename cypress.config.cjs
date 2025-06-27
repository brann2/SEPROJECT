const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080', // Sesuaikan jika port Anda berbeda
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
  },
}); 
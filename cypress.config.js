const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },

    // Base URL of your app (update if needed)
    // baseUrl: "http://localhost:3000",

    // ✅ Allow testing with multiple origins
    experimentalSessionAndOrigin: true,

    // ✅ Helps bypass issues from 3rd-party scripts
    experimentalModifyObstructiveThirdPartyCode: true,

    // Optional: tweak timeouts
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
  },
});

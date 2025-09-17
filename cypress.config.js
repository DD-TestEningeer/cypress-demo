// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: "https://example.com",
//     viewportWidth: 1280,
//     viewportHeight: 720,

//     // Optional: tweak timeouts
//     defaultCommandTimeout: 10000,
//     pageLoadTimeout: 60000,
//   },
// });


const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    screenshotOnRunFailure: true,   // capture screenshot on test failure
    video: true,                    // enable video recording
    videoCompression: 32            // compress videos (default 32)
  }
});

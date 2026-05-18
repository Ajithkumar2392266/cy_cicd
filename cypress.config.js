const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    env: {
      USER: process.env.CYPRESS_USER || 'standard_user',
      PWD: process.env.CYPRESS_PWD || 'secret_sauce',
      apiUrl: process.env.CYPRESS_API_URL || 'https://api.saucedemo.com',
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: 'report.html',
      quiet: false,
      overwrite: true,
      html: true,
      json: true,
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      videoOnFailure: false
    },
    screenshotOnRunFailure: true,
    video: false,
    viewportWidth: 1280,
    viewportHeight: 720,

    retries: {
      runMode: 2,
      openMode: 1
    }
  }
});
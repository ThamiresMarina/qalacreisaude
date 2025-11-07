
const { defineConfig } = require("cypress");
const createBundler =
  require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    
    specPattern: "cypress/e2e/features/**/*.feature",
    
    supportFile: "cypress/support/e2e.js",
    baseUrl: "https://paciente-staging.lacreisaude.com.br",
    viewportWidth: 412,
    viewportHeight: 915,
    defaultCommandTimeout: 10000,
    video: true,

    async setupNodeEvents(on, config) {
      
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({ plugins: [createEsbuildPlugin(config)] }));
      return config;
    },
  },

  
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "mochawesome-report",
    overwrite: true,
    html: true,
    json: true,
    reportFilename: "cypress-report",
  },
});

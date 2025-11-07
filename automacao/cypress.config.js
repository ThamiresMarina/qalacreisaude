
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

const CYP = "automacao/cypress"; 

module.exports = defineConfig({
  e2e: {
    
    specPattern: `${CYP}/e2e/features/**/*.feature`,
    supportFile: `${CYP}/support/e2e.js`,
    screenshotsFolder: `${CYP}/screenshots`,
    videosFolder: `${CYP}/videos`,
    fixturesFolder: false,

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


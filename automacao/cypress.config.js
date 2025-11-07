const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "https://paciente-staging.lacreisaude.com.br",
    supportFile: false, // podes deixar false como está
    viewportWidth: 412,
    viewportHeight: 915,
    defaultCommandTimeout: 10000,
    video: true, // útil para CI (podes pôr false se preferires)

    // 🔎 isto já tinhas (ajustado)
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      config.env = {
        ...(config.env || {}),
        stepDefinitions: "cypress/e2e/features/**/*.js"
      };
      on("file:preprocessor", createBundler({ plugins: [createEsbuildPlugin(config)] }));
      return config;
    }
  },

  // 🧾 Reporter para gerar relatório HTML/JSON
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "mochawesome-report",
    overwrite: true,
    html: true,
    json: true,
    reportFilename: "cypress-report"
  }
});

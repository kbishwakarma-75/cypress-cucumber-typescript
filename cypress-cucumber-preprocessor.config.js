import { defineConfig } from '@badeball/cypress-cucumber-preprocessor';

export default defineConfig({
  stepDefinitions: ['cypress/e2e/step_definitions/**/*.{ts,js}'],
});


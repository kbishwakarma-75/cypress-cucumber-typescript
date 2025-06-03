import { defineConfig } from 'cypress';
import createEsbuildBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import fs from 'fs-extra';
import path from 'path';


export default defineConfig({
  e2e: {
    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);

      on('file:preprocessor', createEsbuildBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // Generate custom report filenames with timestamps
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          // remove video if all tests passed
          const failures = results.tests.some((t) => t.attempts.some((a) => a.state === 'failed'));
          if (!failures) {
            fs.unlink(results.video);
          }
        }

        const reportDir = 'cypress/reports';
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${path.basename(spec.name, '.feature')}-${timestamp}.json`;
        const reportPath = path.join(reportDir, fileName);

        if (!fs.existsSync(reportDir)) {
          fs.mkdirSync(reportDir, { recursive: true });
        }

        fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
      });

      return config;
    },

    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
  },
});

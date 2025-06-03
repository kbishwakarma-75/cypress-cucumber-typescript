const reporter = require('cucumber-html-reporter');
const path = require('path');

module.exports = function generateHTML(jsonPath) {
    const htmlPath = jsonPath.replace(/\.json$/, '.html');

    reporter.generate({
        theme: 'bootstrap',
        jsonFile: jsonPath,
        output: htmlPath,
        reportSuiteAsScenarios: true,
        launchReport: false,
    });

    console.log(`✅ HTML report generated: ${htmlPath}`);
};

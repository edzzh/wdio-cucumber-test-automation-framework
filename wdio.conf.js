"use strict";

const path = require("path");
const fs = require("fs");

const config = {
  // Cucumber Feature File Directory
  specs: [
    'features/*.feature'
  ],
  exclude: [],

  // Browser Configuration
  capabilities: [
    {
      name: 'TestDevLab Automation Demo - Chrome',
      browserName: 'chrome',
      maxInstances: 1,
      idleTimeout: 70,
      platform: 'Windows 10', // Sauce Labs OS platfrorm configuration
      version: '75.0',  // Saue Labs browser version configuration
      metadata: {
        browser: {
          name: 'chrome',
          version: '75.0'
        },
        device: 'Sauce Labs Virtual Machine',
        platform: {
          name: 'Windows',
          version: '10'
        }
      }
    },
    {
      name: 'TestDevLab Automation Demo - Firefox',
      browserName: 'firefox',
      maxInstances: 1,
      idleTimeout: 70,
      platform: 'Windows 10', // Sauce Labs OS platfrorm configuration
      version: '68.0',  // Saue Labs browser version configuration
      metadata: {
        browser: {
          name: 'firefox',
          version: '68.0'
        },
        device: 'Sauce Labs Virtual Machine',
        platform: {
          name: 'Windows',
          version: '10'
        }
      }
    }
  ],

  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  deprecationWarnings: false,
  bail: 0,
  screenshotPath: './errorShots/',
  waitforTimeout: 30000,
  framework: 'cucumber',

  reporters: ['dot', 'multiple-cucumber-html'],
  reporterOptions: {
    htmlReporter: {
      jsonFolder: './reports/json',
      reportFolder: './reports/html',
      displayDuration: true
    }
  },

  // As a default WebdriverIO will run tests against Selenium Standalone service
  services: ['selenium-standalone'],

  cucumberOpts: {
    require: ['./step-definitions/**/*.js'],        // <string[]> (file/dir) require files before executing features
    backtrace: false,   // <boolean> show full backtrace for errors
    compiler: ['js:babel-register'],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false,      // <boolean> invoke formatters without executing steps
    failFast: false,    // <boolean> abort the run on first failure
    format: ['json:./reports/json/cucumber_report.json'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true,       // <boolean> disable colors in formatter output
    snippets: true,     // <boolean> hide step definition snippets for pending steps
    source: true,       // <boolean> hide source uris
    profile: [],        // <string[]> (name) specify the profile to use
    strict: false,      // <boolean> fail if there are any undefined or pending steps
    tags: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    timeout: 60000,      // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
  },

  // WebdriverIO Hooks
  onPrepare: () => {
    // Deleting previous saved json file for HTML report
    const jsonDir = path.join(__dirname, 'reports', 'json');

    if(fs.existsSync(jsonDir)) {
      const jsonArr = fs.readdirSync(path.join(jsonDir));
      if(jsonArr.length !== 0) {
        jsonArr.forEach(json => {
          fs.unlinkSync(path.join(jsonDir, json));
        });
      }
    }
  }
};

// Check if user has passed `--saucelabs` CLI argument to activate wdio sauce service
if (process.env.npm_config_saucelabs) {
  config.services = ['sauce'];
  config.user = process.env.SAUCE_USERNAME;
  config.key = process.env.SAUCE_ACCESS_KEY;
  config.region = 'eu';
}

module.exports.config = config;

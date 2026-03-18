// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const baseConfig = require('./playwright.config');
const path = require('path');

const localPhp = path.resolve(__dirname, 'tools', 'php', 'php.exe');
const phpBin = process.env.PHP_BIN || localPhp;

module.exports = defineConfig({
  ...baseConfig,
  fullyParallel: false,
  workers: 1,
  use: {
    ...(baseConfig.use || {}),
    baseURL: 'http://127.0.0.1:8081',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `"${phpBin}" -S 127.0.0.1:8081 -t .`,
    url: 'http://127.0.0.1:8081',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

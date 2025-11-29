# Automated Testing Guide for MyCiti Layout Bidadi Website

This document describes the automated testing setup for the website.

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Setup

1. Install dependencies:
```bash
npm install
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests for specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:safari
```

### View test report
```bash
npm run test:report
```

## Test Coverage

The test suite includes:

### 1. Homepage Tests (`homepage.spec.js`)
- Page loading verification
- Logo and header display
- Contact information visibility
- Social media links functionality
- Console error detection
- Broken image detection
- Preloader and scroll button checks

### 2. Navigation Tests (`navigation.spec.js`)
- Page navigation functionality
- Menu existence and operation
- 404 page handling
- URL routing

### 3. Contact Form Tests (`contact-form.spec.js`)
- Form element presence
- Email validation
- Required field validation
- Contact.php accessibility

### 4. Responsive Design Tests (`responsive.spec.js`)
- Multiple viewport testing (mobile, tablet, desktop)
- Responsive meta tag verification
- Mobile menu toggling
- Horizontal scrollbar detection

### 5. Performance Tests (`performance.spec.js`)
- Page load time measurement
- Image optimization checks
- HTTP request counting
- Asset compression verification
- CSS and JavaScript file presence

### 6. Accessibility Tests (`accessibility.spec.js`)
- Language attribute verification
- Alt text for images
- Heading hierarchy
- Link accessibility
- Form label association
- Color contrast basics
- Keyboard navigation
- Skip link detection

### 7. SEO Tests (`seo.spec.js`)
- Title tag optimization
- Meta description presence
- Meta keywords verification
- Author information
- Favicon presence
- Canonical URL (optional)
- Open Graph tags (optional)
- Robots configuration
- Structured data detection
- H1 tag validation

## Before Deploying Changes

Always run the test suite before deploying to production:

```bash
# Run full test suite
npm test

# If all tests pass, view the report
npm run test:report

# If tests fail, debug specific tests
npm run test:debug
```

## Continuous Integration

For CI/CD pipelines, tests will automatically:
- Run in headless mode
- Retry failed tests twice
- Generate JSON and HTML reports
- Capture screenshots and videos on failure

## Extending Tests

To add new tests:

1. Create a new spec file in the `tests/` directory
2. Follow the naming convention: `feature-name.spec.js`
3. Import test utilities:
```javascript
const { test, expect } = require('@playwright/test');
```

4. Write tests using the Playwright API:
```javascript
test('should do something', async ({ page }) => {
  await page.goto('/');
  // Your test code here
});
```

## Configuration

Modify `playwright.config.js` to:
- Change base URL for different environments
- Adjust timeout values
- Add/remove browsers
- Configure reporters
- Set retry logic

## Troubleshooting

### Tests fail on first run
Run: `npx playwright install` to install browser binaries

### Port 8080 already in use
Change the port in `playwright.config.js` webServer configuration

### Tests timeout
Increase timeout in individual tests or globally in config

### Browser not launching
Ensure you have the required browser binaries: `npx playwright install chromium firefox webkit`

## Reports

After running tests:
- HTML report: `playwright-report/index.html`
- JSON results: `test-results/results.json`
- Screenshots: `test-results/` (on failure)
- Videos: `test-results/` (on failure)

## Best Practices

1. Run tests before committing code
2. Run tests before creating pull requests
3. Review test reports for failures
4. Keep tests updated as site evolves
5. Add tests for new features
6. Monitor performance metrics over time

## Support

For issues with:
- Playwright: https://playwright.dev/docs/intro
- Testing strategy: Review individual test files
- Configuration: Check `playwright.config.js`

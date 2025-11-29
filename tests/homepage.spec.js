const { test, expect } = require('@playwright/test');

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/MyCiti Layout, Bidadi/);
  });

  test('should display header with logo', async ({ page }) => {
    const logo = page.locator('.it-up-brand-logo img');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('alt', 'Home');
  });

  test('should display contact information in header', async ({ page }) => {
    await expect(page.getByText('mycitiownersassociation@gmail.com')).toBeVisible();
    await expect(page.getByText('+91 9900742192')).toBeVisible();
    await expect(page.getByText('MyCiti Layout, Bidadi, Bengaluru')).toBeVisible();
  });

  test('should have working social media links', async ({ page }) => {
    const facebookLink = page.locator('a[href*="facebook"]');
    const twitterLink = page.locator('a[href*="x.com"]');
    const instagramLink = page.locator('a[href*="instagram"]');
    const youtubeLink = page.locator('a[href*="youtube"]');
    const threadsLink = page.locator('a[href*="threads"]');

    await expect(facebookLink).toBeVisible();
    await expect(twitterLink).toBeVisible();
    await expect(instagramLink).toBeVisible();
    await expect(youtubeLink).toBeVisible();
    await expect(threadsLink).toBeVisible();

    // Verify links have correct target
    await expect(facebookLink).toHaveAttribute('target', '_blank');
    await expect(twitterLink).toHaveAttribute('target', '_blank');
  });

  test('should not have console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('should have no broken images', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const images = await page.locator('img').all();
    for (const img of images) {
      const naturalWidth = await img.evaluate((el) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('should have preloader', async ({ page }) => {
    const preloader = page.locator('#preloader');
    await expect(preloader).toBeInViewport();
  });

  test('should have scroll to top button', async ({ page }) => {
    const scrollButton = page.locator('.scrollup');
    await expect(scrollButton).toBeVisible();
  });
});

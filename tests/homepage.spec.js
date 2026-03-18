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
    await expect(logo).toHaveAttribute('alt', /Home|MyCiti Layout, Bidadi/);
  });

  test('should display contact information in header', async ({ page }) => {
    const headerCta = page.locator('.it-header-top-cta').first();
    await expect(page.locator('a[href="mailto:mycitiownersassociation@gmail.com"]').first()).toBeVisible();
    await expect(headerCta.getByText('+91 9900742192')).toBeVisible();
    await expect(headerCta.getByText('MyCiti Layout, Bidadi, Bengaluru')).toBeVisible();
  });

  test('should have working social media links', async ({ page }) => {
    const socialScope = page.locator('.it-header-top-social').first();
    const facebookLink = socialScope.locator('a[href*="facebook"]').first();
    const twitterLink = socialScope.locator('a[href*="x.com"]').first();
    const instagramLink = socialScope.locator('a[href*="instagram"]').first();
    const youtubeLink = socialScope.locator('a[href*="youtube"]').first();
    const threadsLink = socialScope.locator('a[href*="threads"]').first();

    await expect(facebookLink).toHaveCount(1);
    await expect(twitterLink).toHaveCount(1);
    await expect(instagramLink).toHaveCount(1);
    await expect(youtubeLink).toHaveCount(1);
    await expect(threadsLink).toHaveCount(1);

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
    const ignoredPatterns = [
      /CSRF token error/i,
      /is not valid JSON/i,
    ];
    const actionableErrors = errors.filter((msg) => !ignoredPatterns.some((pattern) => pattern.test(msg)));
    expect(actionableErrors).toHaveLength(0);
  });

  test('should have no broken images', async ({ page }) => {
    test.setTimeout(60_000);
    await page.waitForLoadState('networkidle');

    const brokenVisibleImages = await page.evaluate(() => {
      const isVisible = (el) => !!(el.offsetParent || el.getClientRects().length);
      return Array.from(document.images)
        .map((img) => ({
          src: img.getAttribute('src') || '',
          naturalWidth: img.naturalWidth,
          visible: isVisible(img),
        }))
        .filter((img) => img.src && !img.src.startsWith('data:') && img.visible && img.naturalWidth === 0)
        .map((img) => img.src)
        .slice(0, 10);
    });

    expect(brokenVisibleImages).toEqual([]);
  });

  test('should have preloader', async ({ page }) => {
    const preloader = page.locator('#preloader');
    await expect(preloader).toHaveCount(1);
  });

  test('should have scroll to top button', async ({ page }) => {
    const scrollButton = page.locator('.scrollup');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(scrollButton).toBeVisible();
  });
});

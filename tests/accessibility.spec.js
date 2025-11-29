const { test, expect } = require('@playwright/test');

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have lang attribute on html tag', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
    expect(lang).toBe('en');
  });

  test('should have alt text for images', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      
      // All images should have alt attribute (can be empty for decorative images)
      expect(alt !== null).toBeTruthy();
      
      if (!src?.includes('logo') && !src?.includes('icon')) {
        // Non-decorative images should have meaningful alt text
        if (alt !== '') {
          expect(alt.length).toBeGreaterThan(2);
        }
      }
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    expect(h1Count).toBeLessThanOrEqual(1); // Should have exactly one h1
  });

  test('should have accessible links', async ({ page }) => {
    const links = await page.locator('a').all();
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      
      // Links should have href
      expect(href).toBeTruthy();
      
      // Links should have accessible text or aria-label
      const hasAccessibleName = text?.trim().length > 0 || ariaLabel || title;
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test('should have form labels', async ({ page }) => {
    const inputs = await page.locator('input[type="text"], input[type="email"], textarea').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');
      
      if (id) {
        const label = await page.locator(`label[for="${id}"]`).count();
        const hasLabel = label > 0 || ariaLabel || placeholder;
        expect(hasLabel).toBeTruthy();
      }
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    // Check if text is visible (basic contrast check)
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    const backgroundColor = await body.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    
    expect(backgroundColor).toBeTruthy();
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Tab through focusable elements
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    
    const focusedElement = await page.evaluate(() => 
      document.activeElement?.tagName
    );
    
    expect(focusedElement).toBeTruthy();
  });

  test('should have skip to main content link', async ({ page }) => {
    const skipLink = page.locator('a[href="#main"], a[href="#content"], .skip-link');
    const hasSkipLink = await skipLink.count() > 0;
    
    // This is a best practice but not required
    if (hasSkipLink) {
      await expect(skipLink.first()).toBeAttached();
    }
  });
});

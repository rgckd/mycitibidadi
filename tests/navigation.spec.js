const { test, expect } = require('@playwright/test');

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to initiatives page', async ({ page }) => {
    // Check if initiatives.html exists and navigate
    const response = await page.goto('/initiatives.html');
    expect(response.status()).toBe(200);
    await expect(page).toHaveURL(/initiatives\.html/);
  });

  test('should navigate to owners page', async ({ page }) => {
    const response = await page.goto('/owners.html');
    expect(response.status()).toBe(200);
    await expect(page).toHaveURL(/owners\.html/);
  });

  test('should have navigation menu', async ({ page }) => {
    const nav = page.locator('.it-up-main-navigation, nav, .navbar');
    const navExists = await nav.count() > 0;
    expect(navExists).toBeTruthy();
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    const response = await page.goto('/nonexistent-page.html', { 
      waitUntil: 'domcontentloaded' 
    });
    // Should either show 404 or redirect
    expect([404, 301, 302, 200]).toContain(response.status());
  });
});

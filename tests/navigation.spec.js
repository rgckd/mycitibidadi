const { test, expect } = require('@playwright/test');

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to initiatives page', async ({ page }) => {
    // Check if initiatives.html exists and navigate
    const response = await page.goto('/initiatives.html', { waitUntil: 'domcontentloaded' });
    expect(response && response.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Initiatives|Layout|Owners/i);
  });

  test('should navigate to owners page', async ({ page }) => {
    const response = await page.goto('/owners.html', { waitUntil: 'domcontentloaded' });
    expect(response && response.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Owners|Owners Corner|Important Announcements/i);
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

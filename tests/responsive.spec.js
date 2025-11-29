const { test, expect } = require('@playwright/test');

test.describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'Mobile Portrait', width: 375, height: 667 },
    { name: 'Mobile Landscape', width: 667, height: 375 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`should display correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ 
        width: viewport.width, 
        height: viewport.height 
      });
      
      await page.goto('/');
      
      // Check if page loads
      await expect(page).toHaveTitle(/MyCiti Layout, Bidadi/);
      
      // Check if header is visible
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Check for horizontal scrollbar (shouldn't have on mobile)
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow small tolerance
    });
  }

  test('should have responsive meta tag', async ({ page }) => {
    await page.goto('/');
    
    const metaViewport = await page.locator('meta[name="viewport"]');
    await expect(metaViewport).toHaveAttribute(
      'content', 
      /width=device-width/
    );
  });

  test('should toggle mobile menu if present', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/');
      
      const menuToggle = page.locator('.navbar-toggle, .menu-toggle, [aria-label*="menu" i], button.navbar-toggler');
      const menuToggleExists = await menuToggle.count() > 0;
      
      if (menuToggleExists) {
        await menuToggle.first().click();
        
        // Wait for menu to appear
        await page.waitForTimeout(500);
        
        const menu = page.locator('.navbar-collapse, .mobile-menu, nav');
        await expect(menu.first()).toBeVisible();
      }
    }
  });
});

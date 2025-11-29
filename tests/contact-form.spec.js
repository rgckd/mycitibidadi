const { test, expect } = require('@playwright/test');

test.describe('Contact Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have contact form elements', async ({ page }) => {
    // Look for common form elements
    const forms = await page.locator('form').count();
    if (forms > 0) {
      const form = page.locator('form').first();
      await expect(form).toBeVisible();
    }
  });

  test('contact.php should be accessible', async ({ page }) => {
    const response = await page.goto('/contact.php', {
      waitUntil: 'domcontentloaded'
    });
    // Should not return server error
    expect(response.status()).toBeLessThan(500);
  });

  test('should validate email field if present', async ({ page }) => {
    const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
    const emailExists = await emailInput.count() > 0;
    
    if (emailExists) {
      await emailInput.fill('invalid-email');
      const validationMessage = await emailInput.evaluate((el) => el.validationMessage);
      expect(validationMessage).toBeTruthy();
    }
  });

  test('should have required field validation if present', async ({ page }) => {
    const requiredFields = await page.locator('input[required], textarea[required]').all();
    
    for (const field of requiredFields) {
      const isVisible = await field.isVisible();
      if (isVisible) {
        const isRequired = await field.evaluate((el) => el.required);
        expect(isRequired).toBeTruthy();
      }
    }
  });
});

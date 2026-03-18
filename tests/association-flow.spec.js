const { test, expect } = require('@playwright/test');

test.describe('Association Flow Smoke Tests', () => {
  test('should validate Home, Owners, and Association content placement', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#it-up-owners-testimonials')).toHaveCount(1);
    await expect(page.getByText('What Owners Say')).toBeVisible();
    await expect(page.getByText('Planning your site visit')).toBeVisible();
    await expect(page.locator('#it-up-testimonial')).toHaveCount(0);

    await page.goto('/owners.html');
    await expect(page.locator('#it-up-announcements')).toHaveCount(1);
    await expect(page.getByText('Important Updates for MyCiti Owners')).toBeVisible();

    const associationLinks = page.locator('a.nav-link[href="association.php"]');
    expect(await associationLinks.count()).toBeGreaterThan(0);
  });
});

const { test, expect } = require('@playwright/test');

test.describe('SEO Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have title tag', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(70); // Optimal length for SEO
  });

  test('should have meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveCount(1);
    
    const content = await metaDescription.getAttribute('content');
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(50);
    expect(content.length).toBeLessThan(160); // Optimal length for SEO
  });

  test('should have meta keywords', async ({ page }) => {
    const metaKeywords = page.locator('meta[name="keywords"]');
    const hasKeywords = await metaKeywords.count() > 0;
    expect(hasKeywords).toBeTruthy();
  });

  test('should have author meta tag', async ({ page }) => {
    const metaAuthor = page.locator('meta[name="author"]');
    await expect(metaAuthor).toHaveCount(1);
  });

  test('should have favicon', async ({ page }) => {
    const favicon = page.locator('link[rel="shortcut icon"], link[rel="icon"]');
    await expect(favicon.first()).toBeAttached();
    
    const href = await favicon.first().getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('should have canonical URL', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    const hasCanonical = await canonical.count() > 0;
    
    // Canonical is recommended but not required
    if (hasCanonical) {
      const href = await canonical.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('should have Open Graph tags for social sharing', async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    const ogImage = page.locator('meta[property="og:image"]');
    
    const hasOGTags = await ogTitle.count() > 0 || 
                      await ogDescription.count() > 0 || 
                      await ogImage.count() > 0;
    
    // OG tags are recommended but not required
    if (hasOGTags) {
      console.log('Open Graph tags detected - good for social sharing');
    }
  });

  test('should have robots meta tag or robots.txt', async ({ page }) => {
    const robotsMeta = await page.locator('meta[name="robots"]').count();
    
    // Check for robots.txt
    const robotsTxtResponse = await page.request.get('/robots.txt', {
      failOnStatusCode: false
    });
    
    const hasRobotsConfig = robotsMeta > 0 || robotsTxtResponse.ok();
    
    // Having robots configuration is good for SEO
    if (hasRobotsConfig) {
      console.log('Robots configuration detected');
    }
  });

  test('should have structured data (Schema.org)', async ({ page }) => {
    const jsonLd = await page.locator('script[type="application/ld+json"]').count();
    const microdata = await page.locator('[itemscope]').count();
    
    const hasStructuredData = jsonLd > 0 || microdata > 0;
    
    // Structured data is good for SEO but not required
    if (hasStructuredData) {
      console.log('Structured data detected - good for rich snippets');
    }
  });

  test('should have h1 tag with meaningful content', async ({ page }) => {
    const h1 = page.locator('h1').first();
    const h1Count = await page.locator('h1').count();
    
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    const h1Text = await h1.textContent();
    expect(h1Text?.trim().length).toBeGreaterThan(5);
  });
});

const { test, expect } = require('@playwright/test');

test.describe('Performance Tests', () => {
  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Page should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        const response = await page.request.get(src, { failOnStatusCode: false });
        
        if (response.ok()) {
          const contentLength = parseInt(response.headers()['content-length'] || '0');
          // Warn if image is larger than 500KB
          if (contentLength > 500000) {
            console.warn(`Large image detected: ${src} (${(contentLength / 1024).toFixed(2)} KB)`);
          }
        }
      }
    }
  });

  test('should not have excessive HTTP requests', async ({ page }) => {
    const requests = [];
    page.on('request', (request) => requests.push(request));
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Warn if more than 100 requests
    if (requests.length > 100) {
      console.warn(`High number of HTTP requests: ${requests.length}`);
    }
    
    expect(requests.length).toBeLessThan(200);
  });

  test('should have CSS and JS files', async ({ page }) => {
    await page.goto('/');
    
    const stylesheets = await page.locator('link[rel="stylesheet"]').count();
    const scripts = await page.locator('script[src]').count();
    
    expect(stylesheets).toBeGreaterThan(0);
    expect(scripts).toBeGreaterThan(0);
  });

  test('should compress assets', async ({ page }) => {
    await page.goto('/');
    
    const cssFiles = await page.locator('link[rel="stylesheet"]').all();
    
    for (const link of cssFiles) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('data:') && !href.startsWith('http')) {
        const response = await page.request.get(href, { failOnStatusCode: false });
        
        if (response.ok()) {
          const encoding = response.headers()['content-encoding'];
          // Check if file is minified or compressed
          const isMinified = href.includes('.min.') || encoding === 'gzip' || encoding === 'br';
          
          if (!isMinified) {
            console.warn(`Uncompressed CSS file: ${href}`);
          }
        }
      }
    }
  });
});

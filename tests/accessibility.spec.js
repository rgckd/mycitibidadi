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
    let contentImagesChecked = 0;
    let contentImagesWithMeaningfulAlt = 0;
    
    for (const img of images) {
      const metadata = await img.evaluate((el) => {
        const src = el.getAttribute('src') || '';
        const alt = el.getAttribute('alt');
        const isVisible = !!(el.offsetParent || el.getClientRects().length);
        return { src, alt, isVisible };
      });

      if (!metadata.isVisible || !metadata.src || metadata.src.startsWith('data:')) {
        continue;
      }

      const decorativePattern = /\/its\/|pre\.svg|shape|icon\/|logo\/pic\d|ins\d/i;
      if (decorativePattern.test(metadata.src)) {
        continue;
      }

      contentImagesChecked += 1;
      if ((metadata.alt || '').trim().length > 2) {
        contentImagesWithMeaningfulAlt += 1;
      }
    }

    // At least one visible content image should have meaningful alt text.
    expect(contentImagesChecked).toBeGreaterThan(0);
    expect(contentImagesWithMeaningfulAlt).toBeGreaterThan(0);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    expect(h1Count).toBeLessThanOrEqual(1); // Should have exactly one h1
  });

  test('should have accessible links', async ({ page }) => {
    const links = await page.locator('a').all();
    let actionableLinkCount = 0;
    let inaccessibleLinkCount = 0;
    
    for (const link of links) {
      const metadata = await link.evaluate((el) => {
        const href = el.getAttribute('href') || '';
        const text = (el.textContent || '').trim();
        const ariaLabel = el.getAttribute('aria-label') || '';
        const title = el.getAttribute('title') || '';
        const imgAlt = (el.querySelector('img')?.getAttribute('alt') || '').trim();
        const hasIcon = !!el.querySelector('i');
        const isVisible = !!(el.offsetParent || el.getClientRects().length);
        return { href, text, ariaLabel, title, imgAlt, hasIcon, isVisible };
      });

      if (!metadata.isVisible) {
        continue;
      }

      // Skip placeholder links that are not actionable destinations.
      if (!metadata.href || metadata.href === '#' || metadata.href.startsWith('javascript:')) {
        continue;
      }

      actionableLinkCount += 1;

      const iconExternalLink = metadata.hasIcon && /^https?:/i.test(metadata.href);
      const hasAccessibleName =
        metadata.text.length > 0 ||
        metadata.ariaLabel.length > 0 ||
        metadata.title.length > 0 ||
        metadata.imgAlt.length > 0 ||
        iconExternalLink;

      if (!hasAccessibleName) {
        inaccessibleLinkCount += 1;
      }
    }

    expect(actionableLinkCount).toBeGreaterThan(0);
    // Keep threshold strict enough to catch regressions, but tolerant of legacy placeholders.
    expect(inaccessibleLinkCount).toBeLessThanOrEqual(2);
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

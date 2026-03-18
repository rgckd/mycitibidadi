const { test, expect } = require('@playwright/test');

async function clickSubmit(page) {
  // Legacy preloader/header overlays can intermittently intercept clicks.
  await page.locator('#preloader').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click({ force: true });
}

test.describe('Contact Form Submission Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to the contact form
    await page.locator('text=Get in touch with us!').scrollIntoViewIfNeeded();
  });

  test('should have all required form fields', async ({ page }) => {
    // Check for all form fields
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const phoneInput = page.locator('input[name="phone"]');
    const subjectSelect = page.locator('select[name="subject"]');
    const messageTextarea = page.locator('textarea[name="message"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(subjectSelect).toBeVisible();
    await expect(messageTextarea).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await clickSubmit(page);
    
    // Check if browser validation kicks in
    const nameInput = page.locator('input[name="name"]');
    const isInvalid = await nameInput.evaluate((el) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    
    // Fill with invalid email
    await emailInput.fill('invalid-email');
    
    await clickSubmit(page);
    
    // Check if email validation works
    const isInvalid = await emailInput.evaluate((el) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
  });

  test('should fill out form with valid data', async ({ page }) => {
    // Fill out the form
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="phone"]').fill('+91 9876543210');
    await page.locator('select[name="subject"]').selectOption('Member Registration');
    await page.locator('textarea[name="message"]').fill('This is a test message from automated tests. Site: 123, Phase: 1');
    
    // Verify all fields are filled
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('input[name="phone"]')).toHaveValue('+91 9876543210');
    await expect(page.locator('select[name="subject"]')).toHaveValue('Member Registration');
    await expect(page.locator('textarea[name="message"]')).toHaveValue(/This is a test message/);
  });

  test.skip('should submit form and navigate (mock test)', async ({ page }) => {
    // Fill out the form
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="phone"]').fill('+91 9876543210');
    await page.locator('select[name="subject"]').selectOption('Other');
    await page.locator('textarea[name="message"]').fill('Test message');
    
    // Intercept form submission to prevent actual email sending.
    await page.route('**/contact.php', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body>ok</body></html>'
      });
    });

    // Assert that a POST is sent to the backend endpoint.
    const requestPromise = page.waitForRequest(req => req.url().includes('/contact.php') && req.method() === 'POST');
    await clickSubmit(page);
    const request = await requestPromise;
    expect(request).toBeTruthy();
  });

  test('should have correct form action and method', async ({ page }) => {
    const form = page.locator('form[action="contact.php"]');
    
    await expect(form).toBeVisible();
    
    const method = await form.getAttribute('method');
    expect(method?.toLowerCase()).toBe('post');
  });

  test('should have proper field names matching PHP backend', async ({ page }) => {
    // Verify field names match what contact.php expects
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    
    for (const fieldName of requiredFields) {
      const field = page.locator(`[name="${fieldName}"]`);
      await expect(field).toBeAttached();
    }
  });
});

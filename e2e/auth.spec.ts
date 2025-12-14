import { test, expect } from '@playwright/test';

// Define unique credentials for each test run to avoid conflicts
const userEmail = `testuser-${Date.now()}@example.com`;
const userPassword = 'StrongPassword123!';

test.describe('Authentication Flow', () => {

  test('should allow a user to sign up, log in, and log out', async ({ page }) => {
    // 1. SIGN UP
    await page.goto('/signup');
    await page.locator('input[name="email"]').fill(userEmail);
    await page.locator('input[name="password"]').fill(userPassword);

    await page.click('button[type="submit"]');

    // Assert that the user is redirected to the protected dashboard
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Assert a success message is visible (if you implemented one)
    await expect(page.locator('h1')).toHaveText(`Welcome, ${userEmail}!`);

    // 2. LOG OUT
    await page.click('button:has-text("Log Out")');

    // Assert that the user is redirected to the login page
    await page.waitForURL('/login');
    await expect(page).toHaveURL(/.*\/login/);

    // 3. CONFIRM LOGOUT (Try to go back to dashboard)
    await page.goto('/dashboard');
    // The middleware should redirect them back to login
    await expect(page).toHaveURL(/.*\/login/);
  });
});
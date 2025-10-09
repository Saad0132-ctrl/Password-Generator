import { test, expect } from '@playwright/test';

// Basic connectivity test
test('Password Generator App Loads', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/password-generator-app/index.html');
  await expect(page).toHaveTitle(/Password Generator/);
});

test('UI Elements Present', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/password-generator-app/index.html');
  
  // Check if main elements exist
  await expect(page.locator('#generate-btn')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#copy-btn')).toBeVisible();
});
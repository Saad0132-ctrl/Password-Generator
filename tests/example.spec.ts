import { test, expect } from '@playwright/test';

// Basic connectivity test
test('Password Generator App Loads', async ({ page }) => {
  await page.goto('https://saad0132-ctrl.github.io/Password-Generator/'); // Your GitHub Pages URL
  await expect(page).toHaveTitle(/Password/i);
});

test('UI Elements Present', async ({ page }) => {
  await page.goto('https://saad0132-ctrl.github.io/Password-Generator/');
  
  // Check if main elements exist
  const generateBtn = page.locator('button, input[type="button"]').first();
  await expect(generateBtn).toBeVisible();
});
import { test, expect } from '@playwright/test';

test('Password Strength Indicator - Weak Password', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/password-generator-app/index.html');
  
  // Uncheck all options except lowercase for weak password
  await page.uncheck('#uppercase');
  await page.uncheck('#numbers');
  await page.uncheck('#symbols');
  await page.locator('#length').fill('6');
  
  await page.click('#generate-btn');
  
  // Check strength indicator shows weak
  await expect(page.locator('#strength-text')).toHaveText('Weak');
  await expect(page.locator('#strength-bar')).toHaveClass(/weak/);
});

test('Password Strength Indicator - Strong Password', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/password-generator-app/index.html');
  
  // Enable all options for strong password
  await page.check('#uppercase');
  await page.check('#lowercase');
  await page.check('#numbers');
  await page.check('#symbols');
  await page.locator('#length').fill('16');
  
  await page.click('#generate-btn');
  
  // Check strength indicator shows strong
  await expect(page.locator('#strength-text')).toHaveText('Strong');
  await expect(page.locator('#strength-bar')).toHaveClass(/strong/);
});

test('Password Strength Indicator - Visual Elements', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/password-generator-app/index.html');
  
  // Check strength indicator elements are visible
  await expect(page.locator('.strength-container')).toBeVisible();
  await expect(page.locator('#strength-indicator')).toBeVisible();
  await expect(page.locator('#strength-bar')).toBeVisible();
  await expect(page.locator('#strength-text')).toBeVisible();
});
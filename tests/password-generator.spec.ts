import { test, expect } from '@playwright/test';

test('Password Generator - Generate Password', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/password-generator-app/index.html');
  
  // Test password generation button
  await page.click('#generate-btn');
  
  // Check if password is generated
  const passwordField = page.locator('#password');
  await expect(passwordField).not.toHaveValue('');
});

test('Password Generator - Length Slider', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/password-generator-app/index.html');
  
  // Test password length adjustment
  await page.locator('#length').fill('16');
  
  // Generate password and verify length
  await page.click('#generate-btn');
  const password = await page.locator('#password').inputValue();
  expect(password.length).toBe(16);
});

test('Password Generator - Copy Functionality', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/password-generator-app/index.html');
  
  // Generate password first
  await page.click('#generate-btn');
  
  // Test copy button
  await page.click('#copy-btn');
  
  // Verify copy success message
  await expect(page.locator('#copy-btn')).toHaveText('Copied!');
});
import { test, expect } from '@playwright/test';

test('Password Generator - Generate Password', async ({ page }) => {
  // Replace with your actual Password Generator URL
  await page.goto('http://localhost:3000'); // or your deployed URL
  
  // Test password generation button
  await page.click('button:has-text("Generate")');
  
  // Check if password is generated
  const passwordField = page.locator('#password, .password-output, [data-testid="password"]');
  await expect(passwordField).not.toBeEmpty();
});

test('Password Generator - Length Slider', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Test password length adjustment
  const lengthSlider = page.locator('input[type="range"], .length-slider');
  await lengthSlider.fill('12');
  
  // Generate password and verify length
  await page.click('button:has-text("Generate")');
  const password = await page.locator('#password, .password-output').textContent();
  expect(password?.length).toBe(12);
});

test('Password Generator - Copy Functionality', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Generate password first
  await page.click('button:has-text("Generate")');
  
  // Test copy button
  await page.click('button:has-text("Copy"), .copy-btn');
  
  // Verify copy success message or state
  const copyMessage = page.locator('.copy-success, .copied');
  await expect(copyMessage).toBeVisible();
});
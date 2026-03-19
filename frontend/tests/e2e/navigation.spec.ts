import { test, expect } from '@playwright/test';

test.describe('Sinan.AI Comprehensive E2E Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Mock AI responses to ensure stable tests without relying on real LLM availability
    await page.route('**/api/analyze', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          score: 0.8,
          emotion: 'Freude',
          suggestion: 'Weiter so! Deine Nachricht wirkt sehr positiv.'
        })
      });
    });

    await page.route('**/api/agent', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          reply: 'Das ist eine simulierte Antwort des Agenten für den E2E-Test.'
        })
      });
    });

    await page.goto('/');
  });

  test('landing page has correct title and main heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Sinan\.AI/);
    await expect(page.locator('h1').first()).toContainText(/Sinan/i);
  });

  test('language switching works (DE -> EN) on home page', async ({ page }) => {
    // Check for German text
    await expect(page.locator('h1').first()).toContainText(/ich bin/i);
    
    // Switch to English using the accessible name
    // We use .first() because there might be mobile and desktop navbars
    const langPicker = page.getByLabel(/Switch to English/i).first();
    await langPicker.click();
    
    // Verify URL change to /en/
    await expect(page).toHaveURL(/.*\/en\//);
  });

  test('navigation to profile and language persistence', async ({ page }) => {
    // Navigate to Profil (German)
    await page.getByRole('link', { name: /^Profil$/i }).first().click();
    await expect(page).toHaveURL(/\/profil/);
    await expect(page.locator('h1').first()).toContainText(/Der Entwickler hinter dem Code/i);
    
    // Switch to English on profile page
    await page.getByLabel(/Switch to English/i).first().click();
    await expect(page).toHaveURL(/\/en\/profile/);
    await expect(page.locator('h1').first()).toContainText(/The Developer Behind the Code/i);
  });

  test('AI Showcase: Mood Analysis interaction', async ({ page }) => {
    await page.goto('/ai');
    await expect(page.locator('h1').first()).toContainText(/AI Engineering Showcase/i);
    
    // Interact with MoodWidget
    const textarea = page.locator('#mood-input-de');
    await textarea.fill('Ich bin heute sehr glücklich!');
    
    const analyzeBtn = page.locator('#mood-btn-de');
    await analyzeBtn.click();
    
    // Check for "Analyzing..." state if possible, but let's wait for result
    const resultArea = page.locator('#mood-result-de');
    await expect(resultArea).toBeVisible({ timeout: 45000 });
    await expect(page.locator('#mood-badge-de')).not.toContainText('UNDEFINED');
  });

  test('AI Showcase: Agent Chat interaction', async ({ page }) => {
    await page.goto('/ai');

    const chatInput = page.locator('#agent-input-de');
    await chatInput.fill('Berechne 123 * 456');

    const askBtn = page.locator('#agent-btn-de');
    await askBtn.click();

    // Check for AI reply area
    const replyArea = page.locator('#agent-result-area-de');
    await expect(replyArea).toBeVisible({ timeout: 60000 });
    await expect(page.locator('#agent-reply-de')).not.toBeEmpty();
  });

  test('Fehlerfall: API gibt Fehler zurück - UI zeigt Fehlermeldung', async ({ page }) => {
    // Mock: Chat-API antwortet mit Fehler
    await page.route('**/api/chat', async (route) => {
      await route.fulfill({ status: 500, body: 'Internal Server Error' });
    });

    // ChatWidget ist auf der Startseite
    const input = page.locator('#user-input');
    await input.fill('Testnachricht');
    await page.locator('#send-btn').click();

    // UI soll Fehlermeldung anzeigen, nicht blank/eingefroren
    const chatContainer = page.locator('#chat-container');
    await expect(chatContainer).toContainText(/nicht erreichbar|unreachable|error/i, { timeout: 10000 });
  });

  test('Impressum-Seite ist erreichbar', async ({ page }) => {
    await page.goto('/impressum');
    await expect(page).toHaveURL(/\/impressum/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Datenschutz-Seite ist erreichbar', async ({ page }) => {
    await page.goto('/datenschutz');
    await expect(page).toHaveURL(/\/datenschutz/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Agent Chat: Eingabe per Tastaturkürzel Ctrl+Enter', async ({ page }) => {
    await page.goto('/ai');

    const chatInput = page.locator('#agent-input-de');
    await chatInput.fill('Wie spät ist es?');
    await chatInput.press('Control+Enter');

    const replyArea = page.locator('#agent-result-area-de');
    await expect(replyArea).toBeVisible({ timeout: 30000 });
  });

});

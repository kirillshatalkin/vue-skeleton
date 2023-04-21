import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading')).toHaveText('Skeleton. Smth');
    await expect(page.locator('.el-card__header')).toHaveText('Prop');
});

import { test, expect } from '@playwright/test'
// E2E: node-configure
test.describe('node-configure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test('loads without errors', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible()
  })
  test('has no console errors', async ({ page }) => {
    const errors = []
    page.on('pageerror', err => errors.push(err))
    await page.goto('/')
    expect(errors).toHaveLength(0)
  })
})

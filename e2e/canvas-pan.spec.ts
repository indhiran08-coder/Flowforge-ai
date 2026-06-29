import { test, expect } from '@playwright/test'
// E2E: canvas-pan
test.describe('canvas-pan', () => {
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

import { test, expect } from '@playwright/test'

test('loads systems map and shows filters', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Filter by data use' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Filter by data categories' })).toBeVisible()

  await expect(page.getByRole('button', { name: 'Reset filters' })).toBeVisible()
})

test('selects a system card and shows dependency panel', async ({ page }) => {
  await page.goto('/')

  await page.getByText('Example.com Online Storefront').click()

  await expect(page.getByText('Selected system dependencies')).toBeVisible()
})

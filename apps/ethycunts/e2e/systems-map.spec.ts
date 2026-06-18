import { test, expect } from '@playwright/test'

test('loads systems map and shows Mode options', async ({ page }) => {
  await page.goto('/')

  const modeOptions = page.getByRole('radiogroup')
  await expect(modeOptions?.getByText('Colour Code')).toBeVisible()
  await expect(modeOptions?.getByText('D3 visualization')).toBeVisible()

})

test('selects a system card and show Layout options', async ({ page }) => {
  await page.goto('/')

  const layoutOptions = page.getByRole('radiogroup')

  await expect(layoutOptions?.getByText('System type')).toBeVisible()
  await expect(layoutOptions?.getByText('Data use')).toBeVisible()
})

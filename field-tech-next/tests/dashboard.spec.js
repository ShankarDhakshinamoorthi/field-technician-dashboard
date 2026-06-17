import { test, expect } from '@playwright/test';

test.describe('Field Technician Dashboard', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to fully render (React hydration + charts)
    await page.waitForLoadState('networkidle');
  });

  // ── 1. Page Load & Header ────────────────────────────────────
  test.describe('Header', () => {
    test('shows main dashboard title', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Field Technician.*Visit Dashboard/s })).toBeVisible();
    });

    test('shows RASCO Operations branding', async ({ page }) => {
      await expect(page.getByText('RASCO Operations')).toBeVisible();
    });

    test('shows date range', async ({ page }) => {
      await expect(page.getByText(/Jan – Feb 2024/)).toBeVisible();
    });

    test('shows Live data badge', async ({ page }) => {
      await expect(page.getByText('Live data')).toBeVisible();
    });
  });

  // ── 2. KPI Cards ─────────────────────────────────────────────
  test.describe('KPI Cards', () => {
    test('Total Visits card shows 30', async ({ page }) => {
      await expect(page.getByText('Total Visits')).toBeVisible();
      await expect(page.getByText('30')).toBeVisible();
    });

    test('Passed card shows 17', async ({ page }) => {
      await expect(page.getByText('Passed')).toBeVisible();
      await expect(page.getByText('17')).toBeVisible();
    });

    test('Failed card shows 13', async ({ page }) => {
      await expect(page.getByText('Failed')).toBeVisible();
      await expect(page.getByText('13')).toBeVisible();
    });

    test('Pass Rate card shows 56.7%', async ({ page }) => {
      await expect(page.getByText('Pass Rate')).toBeVisible();
      // Pass Rate appears as a KPI value and also as a column header — use first match
      await expect(page.getByText('56.7%').first()).toBeVisible();
    });

    test('renders all 4 KPI cards', async ({ page }) => {
      const kpiLabels = ['Total Visits', 'Passed', 'Failed', 'Pass Rate'];
      for (const label of kpiLabels) {
        await expect(page.getByText(label).first()).toBeVisible();
      }
    });
  });

  // ── 3. Charts ────────────────────────────────────────────────
  test.describe('Charts', () => {
    test('Failures by Region chart title is visible', async ({ page }) => {
      await expect(page.getByText('Failures by Region')).toBeVisible();
    });

    test('Failures by Equipment Type chart title is visible', async ({ page }) => {
      await expect(page.getByText('Failures by Equipment Type')).toBeVisible();
    });

    test('bar chart SVGs are rendered', async ({ page }) => {
      // Recharts renders SVGs — there should be at least 2 (one per chart)
      const svgs = page.locator('.recharts-wrapper svg');
      await expect(svgs.first()).toBeVisible();
      const count = await svgs.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('region axis labels are present (Northeast, Midwest, etc.)', async ({ page }) => {
      await expect(page.getByText('Northeast')).toBeVisible();
      await expect(page.getByText('Midwest')).toBeVisible();
    });

    test('equipment axis labels are present (Firewall, Switch, Router)', async ({ page }) => {
      await expect(page.getByText('Firewall')).toBeVisible();
      await expect(page.getByText('Switch')).toBeVisible();
      await expect(page.getByText('Router')).toBeVisible();
    });
  });

  // ── 4. Technician Performance Table ─────────────────────────
  test.describe('Technician Performance Table', () => {
    test('section heading is visible', async ({ page }) => {
      await expect(page.getByText('Technician Performance')).toBeVisible();
    });

    test('shows all column headers', async ({ page }) => {
      const headers = ['Technician', 'Visits', 'Passed', 'Failed', 'Avg. Duration', 'Pass Rate'];
      for (const h of headers) {
        await expect(page.getByText(h).first()).toBeVisible();
      }
    });

    test('lists all 4 technicians', async ({ page }) => {
      const techs = ['John Carter', 'Sarah Lee', 'Mike Brown', 'Emily Davis'];
      for (const name of techs) {
        await expect(page.getByText(name)).toBeVisible();
      }
    });

    test('shows technician avatar initials', async ({ page }) => {
      // JC for John Carter, SL for Sarah Lee
      await expect(page.getByText('JC')).toBeVisible();
      await expect(page.getByText('SL')).toBeVisible();
      await expect(page.getByText('MB')).toBeVisible();
      await expect(page.getByText('ED')).toBeVisible();
    });

    test('shows duration values with min suffix', async ({ page }) => {
      // At least one "min" value visible in the table
      const minCells = page.getByText(/\d+ min/);
      await expect(minCells.first()).toBeVisible();
    });
  });

  // ── 5. Raw Visit Data Toggle ─────────────────────────────────
  test.describe('Raw Visit Data Toggle', () => {
    test('toggle button is visible with correct record count', async ({ page }) => {
      await expect(page.getByText('View raw visit data (30 records)')).toBeVisible();
    });

    test('raw data table is hidden by default', async ({ page }) => {
      // V001 should not be visible before expanding
      await expect(page.getByText('V001')).not.toBeVisible();
    });

    test('clicking toggle reveals the raw data table', async ({ page }) => {
      await page.getByText('View raw visit data (30 records)').click();
      await expect(page.getByText('V001')).toBeVisible();
    });

    test('raw data table has correct column headers when open', async ({ page }) => {
      await page.getByText('View raw visit data (30 records)').click();
      const tableHeaders = ['Visit ID', 'Date', 'Technician', 'Region', 'Equipment', 'Result', 'Duration', 'Site'];
      for (const h of tableHeaders) {
        await expect(page.getByText(h).first()).toBeVisible();
      }
    });

    test('table shows Pass/Fail badges', async ({ page }) => {
      await page.getByText('View raw visit data (30 records)').click();
      // Should have both Pass and Fail badges
      await expect(page.getByText('Pass').first()).toBeVisible();
      await expect(page.getByText('Fail').first()).toBeVisible();
    });

    test('clicking toggle again collapses the table', async ({ page }) => {
      const toggleBtn = page.getByText('View raw visit data (30 records)');
      await toggleBtn.click();
      await expect(page.getByText('V001')).toBeVisible();
      await toggleBtn.click();
      await expect(page.getByText('V001')).not.toBeVisible();
    });
  });

  // ── 6. Footer ────────────────────────────────────────────────
  test.describe('Footer', () => {
    test('shows RASCO branding and year', async ({ page }) => {
      await expect(page.getByText('RASCO Field Operations · Q1 2024')).toBeVisible();
    });

    test('shows summary stats', async ({ page }) => {
      await expect(page.getByText('30 visits · 4 technicians · 4 regions')).toBeVisible();
    });
  });

  // ── 7. Visual / Layout ───────────────────────────────────────
  test.describe('Visual & Layout', () => {
    test('page has dark background (no white flash)', async ({ page }) => {
      const bg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      // Body or root should not be pure white
      expect(bg).not.toBe('rgb(255, 255, 255)');
    });

    test('page title is set correctly', async ({ page }) => {
      await expect(page).toHaveTitle(/Field|Dashboard|RASCO/i);
    });

    test('no console errors on load', async ({ page }) => {
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await page.reload();
      await page.waitForLoadState('networkidle');
      // Filter out known benign errors (e.g. favicon 404)
      const realErrors = errors.filter(e => !e.includes('favicon'));
      expect(realErrors).toHaveLength(0);
    });
  });

});

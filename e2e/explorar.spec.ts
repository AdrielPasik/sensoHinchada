import { expect, test } from "@playwright/test";

test("explora un club DEMO sin exponer una participación", async ({ page }) => {
  await page.goto("/explorar");
  await page.getByPlaceholder("Buscar club o provincia…").fill("Excursionistas");
  await expect(page.getByText("Club: Excursionistas")).toBeVisible();
  await page.getByText("Club: Excursionistas").click();
  await expect(page.getByText("Ficha de club · DEMO")).toBeVisible();
  await expect(page.getByText("DATOS DEMO")).toBeVisible();
});

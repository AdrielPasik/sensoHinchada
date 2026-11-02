import { expect, test } from "@playwright/test";

test("explora un club DEMO sin exponer una participación", async ({ page }) => {
  await page.goto("/explorar");
  // El cambio de estado confirma que React ya hidrató el explorador antes de escribir.
  await page.getByRole("button", { name: "Intensidad" }).click();
  await expect(page.getByRole("button", { name: "Intensidad" })).toHaveAttribute("aria-pressed", "true");
  await page.getByPlaceholder("Buscar club o provincia…").fill("Excursionistas");
  await expect(page.getByText("Club: Excursionistas")).toBeVisible();
  await page.getByText("Club: Excursionistas").click();
  await expect(page.getByText("Ficha de club · DEMO")).toBeVisible();
  await expect(page.getByRole("main").getByText("DATOS DEMO").first()).toBeVisible();
});

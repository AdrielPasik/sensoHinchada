import { describe, expect, it } from "vitest";
import { isPublicationAllowed, normalise, rank } from "./stats";

describe("estadísticas públicas", () => {
  it("calcula porcentaje con el denominador del área y ordena empates de forma determinista", () => {
    expect(rank([{ name: "River", votes: 10 }, { name: "Boca", votes: 10 }, { name: "Colón", votes: 5 }], 25)).toEqual([
      { name: "Boca", votes: 10, position: 1, percentage: 40 },
      { name: "River", votes: 10, position: 2, percentage: 40 },
      { name: "Colón", votes: 5, position: 3, percentage: 20 },
    ]);
  });

  it("no divide por cero", () => { expect(rank([{ name: "Boca", votes: 1 }], 0)).toEqual([]); });
  it("normaliza tildes, mayúsculas y espacios", () => { expect(normalise("  Colón ")).toBe("colon"); expect(normalise("UNIÓN")).toBe("union"); });
  it("protege resultados con poco volumen", () => { expect(isPublicationAllowed(19)).toBe(false); expect(isPublicationAllowed(20)).toBe(true); });
});

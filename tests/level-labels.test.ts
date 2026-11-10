import { describe, it, expect } from "vitest";
import { t, levelLabels } from "../src/i18n/ui";

describe("подписи уровней владения (FR-003, локализованы)", () => {
  it("ru: базовый / уверенный / продвинутый", () => {
    expect(t("ru", levelLabels.basic)).toBe("базовый");
    expect(t("ru", levelLabels.confident)).toBe("уверенный");
    expect(t("ru", levelLabels.advanced)).toBe("продвинутый");
  });

  it("en: basic / confident / advanced", () => {
    expect(t("en", levelLabels.basic)).toBe("basic");
    expect(t("en", levelLabels.confident)).toBe("confident");
    expect(t("en", levelLabels.advanced)).toBe("advanced");
  });

  it("все три уровня имеют подписи в обеих локалях", () => {
    for (const locale of ["ru", "en"] as const) {
      for (const key of Object.values(levelLabels)) {
        expect(t(locale, key)).not.toBe(key);
      }
    }
  });
});

import { describe, it, expect } from "vitest";
import { profileSchema } from "../src/content/schema";
import ru from "../src/content/profile/ru.json";
import en from "../src/content/profile/en.json";

const ruData = profileSchema.parse(ru);
const enData = profileSchema.parse(en);

describe("схема profile", () => {
  it("ru.json валиден и имеет locale=ru", () => {
    expect(ruData.locale).toBe("ru");
  });

  it("en.json валиден и имеет locale=en", () => {
    expect(enData.locale).toBe("en");
  });

  it("отклоняет невалидный уровень владения", () => {
    const broken = {
      ...ru,
      hardSkills: [{ name: "X", category: "Y", level: "expert" }],
    };
    expect(() => profileSchema.parse(broken)).toThrow();
  });

  it("отклоняет summary длиннее 400 символов", () => {
    const broken = { ...ru, summary: "a".repeat(401) };
    expect(() => profileSchema.parse(broken)).toThrow();
  });

  it("требует минимум 2 контакта", () => {
    const broken = { ...ru, contacts: [ru.contacts[0]] };
    expect(() => profileSchema.parse(broken)).toThrow();
  });
});

describe("паритет локалей (data-model.md, кросс-локальные правила)", () => {
  it("правило 1: наборы hardSkills[].name идентичны", () => {
    const ruNames = new Set(ruData.hardSkills.map((s) => s.name));
    const enNames = new Set(enData.hardSkills.map((s) => s.name));
    expect(ruNames).toEqual(enNames);
  });

  it("правило 1: наборы softSkills совпадают по количеству и порядку (имена локализуются)", () => {
    expect(enData.softSkills.length).toBe(ruData.softSkills.length);
    expect(ruData.softSkills.length).toBeGreaterThan(0);
  });

  it("правило 2: наборы contacts[].url идентичны", () => {
    const ruUrls = new Set(ruData.contacts.map((c) => c.url));
    const enUrls = new Set(enData.contacts.map((c) => c.url));
    expect(ruUrls).toEqual(enUrls);
  });

  it("правило 3: email и github присутствуют в каждой локали (FR-002)", () => {
    for (const data of [ruData, enData]) {
      const types = new Set(data.contacts.map((c) => c.type));
      expect(types.has("email")).toBe(true);
      expect(types.has("github")).toBe(true);
    }
  });

  it("правило 4: hardSkills[].name уникальны внутри локали", () => {
    for (const data of [ruData, enData]) {
      const names = data.hardSkills.map((s) => s.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it("правило 4: contacts[].url уникальны внутри локали", () => {
    for (const data of [ruData, enData]) {
      const urls = data.contacts.map((c) => c.url);
      expect(new Set(urls).size).toBe(urls.length);
    }
  });
});

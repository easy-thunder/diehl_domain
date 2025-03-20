import { skillsToDisplayFunction } from "../skillsToDisplay";

describe("skillsToDisplayFunction", () => {
  it("should return an array of skill objects", () => {
    const skills = skillsToDisplayFunction();
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  it("each skill should have required properties", () => {
    const skills = skillsToDisplayFunction();
    skills.forEach(skill => {
      expect(skill).toHaveProperty("skillName");
      expect(skill).toHaveProperty("domain");
      expect(skill).toHaveProperty("coreOrSupporting");
      expect(skill).toHaveProperty("information");
      expect(skill).toHaveProperty("tools");
      expect(skill).toHaveProperty("acquisitionDate");
    });
  });
});

import { render, screen } from "@testing-library/react";
import SkillCard from "./skillCard";
import "@testing-library/jest-dom";

const mockSkill = {
  skillName: "JavaScript",
  domain: ["Client Side"],
  coreOrSupporting: "Core",
  information: "A versatile programming language.",
  tools: ["React", "Node.js"],
  gameProjects: ["ConnectFour"],
  articles: ["js-basics"],
  acquisitionDate: "June 2022"
};

describe("SkillCard Component", () => {
  it("renders skill name and acquisition date", () => {
    render(<SkillCard {...mockSkill} />);
    
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("June 2022")).toBeInTheDocument();
  });

  it("renders domain and tools", () => {
    render(<SkillCard {...mockSkill} />);
    
    expect(screen.getByText("Client Side")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("React"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Node.js"))).toBeInTheDocument();  });

  it("renders articles and projects with links", () => {
    render(<SkillCard {...mockSkill} />);
    
    expect(screen.getByText("js-basics")).toBeInTheDocument();
    expect(screen.getByText("ConnectFour")).toBeInTheDocument();
  });
});

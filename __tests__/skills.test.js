import { render, screen, fireEvent } from "@testing-library/react";
import Skills from "../index";
import { skillsToDisplayFunction } from "../skillsToDisplay";

describe("Skills Component", () => {
  it("renders skill cards", () => {
    render(<Skills />);
    let skillCards = Array.from(document.querySelectorAll(".skill-card"));
    expect(skillCards.length).toBeGreaterThan(0);
  });

  it("filters skills by domain", () => {
    render(<Skills />);
    
    const domainDropdown = screen.getByText("Filter by Domain Name");
    fireEvent.click(domainDropdown);

    const clientSideOption = screen.getByLabelText("Client Side");
    fireEvent.click(clientSideOption);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    let filteredSkills = Array.from(document.querySelectorAll(".skill-card"));
    expect(filteredSkills.length).toBeLessThan(skillsToDisplayFunction().length);
  });

  it("clears filters and resets skills", () => {
    render(<Skills />);
    
    fireEvent.click(screen.getByText("Filter by Domain Name"));
    fireEvent.click(screen.getByLabelText("Client Side"));
    fireEvent.click(screen.getByText("Submit"));

    // Convert NodeList to an array
    let filteredSkills = Array.from(document.querySelectorAll(".skill-card"));
    expect(filteredSkills.length).toBeLessThan(skillsToDisplayFunction().length);
    fireEvent.click(screen.getByText("Filter by Domain Name"));
    fireEvent.click(screen.getByText("Clear Selection"));

    // Convert NodeList to an array again after clearing
    filteredSkills = Array.from(document.querySelectorAll(".skill-card"));
    expect(filteredSkills.length).toBe(skillsToDisplayFunction().length);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/homePageComponents/Hero";
import "@testing-library/jest-dom";

describe("All buttons on Hero page should work", () => {
  it("Skills button should have correct link", () => {
    render(<Hero />);

    // Find the LightButton element
    const skillsButton = document.querySelector('.btn.btn-white.btn-animated')
    expect(skillsButton).toBeInTheDocument(); 

    const linkElement = skillsButton.closest("a");
    expect(linkElement).not.toBeNull(); 
    expect(linkElement).toHaveAttribute("href", "/skills"); 
  });
  it("Resume button should have link to JD_SWENG_RES.pdf", () => {
    render(<Hero />);

    // Find the LightButton element
    const resumeButton = document.querySelector('.btn.btn-dark.btn-animated')
    expect(resumeButton).toBeInTheDocument(); 

    const linkElement = resumeButton.closest("a");
    expect(linkElement).not.toBeNull(); 
    expect(linkElement).toHaveAttribute("href", "/JD_SWENG_RES.pdf"); 
  });
});

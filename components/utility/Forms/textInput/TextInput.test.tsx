import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "./TextInput";

describe("TextInput", () => {
  const mockOnChange = jest.fn();

  it("renders the label and input with correct props", () => {
    render(
      <TextInput
        label="Name"
        placeholder="Enter your name"
        name="username"
        value=""
        onChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("Enter your name") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.name).toBe("username");
    expect(input.type).toBe("text");
  });

  it("calls onChange when input is typed in", () => {
    render(
      <TextInput
        label="Email"
        placeholder="Enter email"
        name="email"
        value=""
        onChange={mockOnChange}
      />
    );

    const input = screen.getByPlaceholderText("Enter email");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
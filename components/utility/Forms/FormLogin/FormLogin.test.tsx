


import {render, screen, fireEvent} from "@testing-library/react"
import FormLogin from "./FormLogin"

type fakeRequestParams = {
    email: string;
    password: string;
};    

describe("Login Form", () => {
    render(<FormLogin/>)

    const fakeGetUserByEmail = async ({email, password}:fakeRequestParams) => {
        if (email === "correctEmail@gmail.com" && password === "correctPassword") {
          return { id: 1, email, password };
        }
        return null;
    };
    jest.mock("../db", () => ({
  getUserByEmail: jest.fn((email) =>
    email === "correctEmail@gmail.com"
      ? Promise.resolve({ id: 1, email, password: "correctPassword" })
      : Promise.resolve(null)
  ),
}));


    it("should fail if the email is not valid",()=>{
        const mockEmail = "wrongEmail"
        const mockPassword = "correctPassword"
        const mockSubmit = fakeGetUserByEmail({email:mockEmail, password:mockPassword});
        expect(mockSubmit).toBe(null);
    })
    it("should fail if the password is not valid",()=>{
        
    })
    it("It should return a user object when the form is submitted with valid password and email",()=>{

    })
    it("should have a way to sign in with google",()=>{
        
    })
})

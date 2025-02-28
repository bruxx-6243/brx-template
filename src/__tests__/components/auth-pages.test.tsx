import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import LoginPage from "@/pages/auth/login/page";
import SignUpPage from "@/pages/auth/signup/page";

describe("Authentification pages", () => {
  test("verify that the login page is defined", () => {
    const loginPage = render(<LoginPage />);
    expect(loginPage).toBeDefined();
  });

  test("verify that the login page is defined", () => {
    const signUpPage = render(<SignUpPage />);
    expect(signUpPage).toBeDefined();
  });
});

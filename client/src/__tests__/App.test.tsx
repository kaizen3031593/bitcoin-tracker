import React from "react";
import { render } from "@testing-library/react";
import App from '../App';

function renderApp() {
  return render(<App />);
}

describe("<App />", () => {
  test("landing page should render correctly", async () => {
    const { findByTestId } = renderApp();
  
    const loginForm = await findByTestId("login-form");
  
    expect(loginForm).toHaveFormValues({
      username: "",
      password: "",
      remember: true
    });
});
});
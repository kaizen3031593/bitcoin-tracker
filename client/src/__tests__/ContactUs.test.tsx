import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { ContactUsForm } from "../ContactUs";

function renderContactForm() {
    return render(<ContactUsForm />);
}

describe("<ContactUs Form />", () => {
    test("should display a blank login form", async () => {
        const { findByTestId } = renderContactForm();
      
        const name = await findByTestId("name");
        const email = await findByTestId("email");
        const threshold = await findByTestId("threshold");

        expect(name).toHaveValue("");
        expect(email).toHaveValue("");
        expect(threshold).toHaveValue("");

    });

    test("should allow entering a name", async () => {
        const { findByTestId } = renderContactForm();
      
        const name = await findByTestId("name");
        fireEvent.change(name, { target: { value: "test" } });

        expect(name).toHaveValue("test");
    });

    test("should allow entering an email", async () => {
        const { findByTestId } = renderContactForm();
      
        const email = await findByTestId("email");
        fireEvent.change(email, { target: { value: "abc@email.com" } });

        expect(email).toHaveValue("abc@email.com");
    });

    test("should allow entering a threshold", async () => {
        const { findByTestId } = renderContactForm();
      
        const threshold = await findByTestId("threshold");
        fireEvent.change(threshold, { target: { value: "0" } });

        expect(threshold).toHaveValue("0");
    });
});
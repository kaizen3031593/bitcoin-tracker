import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Form, IFields, required, isEmail, isNumber  } from "../Form";
import { Field } from "../Field";

const fields: IFields = {
    name: {
        id: "name",
        label: "Name",
        validation: { rules: [required] }
    },
    email: {
        id: "email",
        label: "Email",
        validation: { rules: [isEmail, required] }
    },
    threshold: {
        id: "threshold",
        label: "Threshold",
        validation: { rules: [isNumber, required] }
    }
};

function renderForm() {
    return render(
        <Form 
            action=""
            fields={fields}
            render={() => (
                <React.Fragment>
                <div className="alert alert-info" role="alert">
                    Enter the information below and we'll get back to you as soon as we
                    can.
                </div>
                <Field {...fields.name} />
                <Field {...fields.email} />
                <Field {...fields.threshold} />
                </React.Fragment>
            )}
        />
    );
}


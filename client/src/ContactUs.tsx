import * as React from "react";
import { Form, IFields, required, isEmail, isNumber } from "./Form";
import { Field } from "./Field";

export const ContactUsForm: React.FC = () => {
    const fields: IFields = {
        name: {
          id: "name",
          label: "Name",
          validation: { rule: required }
        },
        email: {
          id: "email",
          label: "Email",
          validation: { rule: isEmail }
        },
        threshold: {
          id: "threshold",
          label: "Threshold",
          validation: { rule: isNumber }
        }
      };
    return (
        <Form
        action="https://ln7kvmlhug.execute-api.us-east-1.amazonaws.com/prod/"
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
};
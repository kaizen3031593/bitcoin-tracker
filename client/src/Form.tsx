import React from 'react';
import axios from 'axios';
import { IFieldProps } from "./Field";

export interface IFields {
    [key: string]: IFieldProps;
}

interface IFormProps {
    /* The http path that the form will be posted to */
    action: string;

    /* The props for all the fields on the form */
    fields: IFields;

    /* A prop which allows content to be injected */
    render: () => React.ReactNode;
}
  
export interface IValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: any;
}
  
export interface IErrors {
    /* The validation error messages for each field (key is the field name */
    [key: string]: string;
}

export interface IResponse {
    /* The data of the response*/
    [key: string]: string;
}

export interface IFormState {
    /* The field values */
    values: IValues;
  
    /* The field validation error messages */
    errors: IErrors;

    /* The response from the API call */
    response: IResponse;
  
    /* Whether the form has been successfully submitted */
    submitSuccess?: boolean;
}

export interface IFormContext extends IFormState {
  /* Function that allows values in the values state to be set */
  setValues: (values: IValues) => void;

  /* Function that validates a field */
  validate: (fieldName: string) => void;
}

/*
 * The context which allows state and functions to be shared with Field.
 * Note that we need to pass createContext a default value which is why undefined is unioned in the type
 */
export const FormContext = React.createContext<IFormContext|undefined>(undefined);

/**
 * Validates whether a field has a value
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const required = (values: IValues, fieldName: string): string =>
    values[fieldName] === undefined ||
    values[fieldName] === null ||
    values[fieldName] === ""
        ? "This must be populated"
        : "";

/**
* Validates whether a field is a valid email
* @param {IValues} values - All the field values in the form
* @param {string} fieldName - The field to validate
* @returns {string} - The error message
*/
export const isEmail = (values: IValues, fieldName: string): string =>
    values[fieldName] &&
    values[fieldName].search(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
        ? "This must be in a valid email format"
        : "";

/**
* Validates whether a field is a valid number
* @param {IValues} values - All the field values in the form
* @param {string} fieldName - The field to validate
* @returns {string} - The error message
*/
export const isNumber = (values: IValues, fieldName: string): string =>
    values[fieldName] && 
    isNaN(values[fieldName])
        ? "This must be a number"
        : "";    

/**
* Validates whether a field is within a certain amount of characters
* @param {IValues} values - All the field values in the form
* @param {string} fieldName - The field to validate
* @param {number} length - The maximum number of characters
* @returns {string} - The error message
*/
export const maxLength = (
    values: IValues,
    fieldName: string,
    length: number
): string =>
    values[fieldName] && values[fieldName].length > length
        ? `This can not exceed ${length} characters`
        : "";

export class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps){
        super(props);

        const errors: IErrors = {};
        const values: IValues = {};
        const response: IResponse = {};

        this.state = {
            errors,
            values,
            response,
        };
    }  

    /**
     * Stores new field values in state
     * @param {IValues} values - The new field values
     */
    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    };

    private setResponse = (response: IResponse) => {
        this.setState({ response: response});
        console.log(this.state.response);
    }

    /**
     * Returns whether there are any errors in the errors object that is passed in
     * @param {IErrors} errors - The field errors
     */
    private haveErrors(errors: IErrors) {
        let haveError: boolean = false;
        Object.keys(errors).map((key: string) => {
            if (errors[key].length > 0) {
                haveError = true;
            }
            return null;
            });
        return haveError;
    }

    /**
     * Handles form submission
     * @param {React.FormEvent<HTMLFormElement>} e - The form event
     */
    private handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        console.log(this.state.values);
    
        if (this.validateForm()) {
          const submitSuccess: boolean = await this.submitForm();
          this.setState({ submitSuccess });
        }
    };

    /**
     * Executes the validation rules for all the fields on the form and sets the error state
     * @returns {boolean} - Returns true if the form is valid
     */
    private validateForm(): boolean {
        const errors: IErrors = {};
        // eslint-disable-next-line array-callback-return
        Object.keys(this.props.fields).map((fieldName: string) => {
            errors[fieldName] = this.validate(fieldName);
        });
        this.setState({ errors });
        return !this.haveErrors(errors);
    }

    /**
     * Executes the validation rule for the field and updates the form errors
     * @param {string} fieldName - The field to validate
     * @returns {string} - The error message
     */
    private validate = (fieldName: string): string => {
        let newError: string = "";
    
        if (
            this.props.fields[fieldName] &&
            this.props.fields[fieldName].validation
        ) {
        newError = this.props.fields[fieldName].validation!.rule(
            this.state.values,
            fieldName,
            this.props.fields[fieldName].validation!.args
        );
        }
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.errors[fieldName] = newError;
        this.setState({
        errors: { ...this.state.errors, [fieldName]: newError }
        });
        return newError;
    };

    /**
     * Submits the form to the http api
     * @returns {boolean} - Whether the form submission was successful or not
     */
    private async submitForm(): Promise<boolean> {
        console.log(JSON.stringify(this.state.values))
        try {
            axios({
                method: 'get',
                url: `https://ln7kvmlhug.execute-api.us-east-1.amazonaws.com/prod/`,
                params: {
                    email: this.state.values.email,
                    threshold: this.state.values.threshold
                }
            })
            .then((response) => {
                console.log(response);
                this.setResponse({"data": response.data});
            })
            .catch((error) => {
                console.log(error);
            })
            return true;
        } catch (ex) {
            return false;
        }
    }

    public render() {
        const {submitSuccess, errors, response } = this.state;
        const context: IFormContext = {
            ...this.state,
            setValues: this.setValues,
            validate: this.validate
        };
        return (
            <FormContext.Provider value={context}>
                <form onSubmit={this.handleSubmit} noValidate={true}>
                    <div className="container">
                        {this.props.render()}
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={this.haveErrors(errors)}
                            >
                                Submit
                            </button>
                        </div>
                        {submitSuccess && (
                            <> <div className="alert alert-info" role="alert">
                                The form was successfully submitted!
                            </div>
                            <p>{response!.data}</p> </>
                        )}
                        {submitSuccess === false && !this.haveErrors(errors) && (
                            <div className="alert alert-danger" role="alert">
                                Sorry, an unexpected error has occurred
                            </div>
                        )}
                        {submitSuccess === false && this.haveErrors(errors) && (
                            <div className="alert alert-danger" role="alert">
                                Sorry, the form you submitted is invalid. Please try again.
                            </div>
                        )}
                    </div>
                </form>
            </FormContext.Provider>
        )
    }
}
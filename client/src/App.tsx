import React from 'react';
import { Axios } from "./Axios";
import { ContactUsForm } from "./ContactUs";
import { BitcoinNavbar } from "./Navbar";
import LoginForm, { Props } from "./LoginForm";

const defaultProps: Props = {
  onPasswordChange() {
    return;
  },
  onRememberChange() {
    return;
  },
  onUsernameChange() {
    return;
  },
  onSubmit() {
    return;
  },
  shouldRemember: true
};

class App extends React.Component {
  public render() {
    return (
      <div className="mt-3">
        <BitcoinNavbar/>
        <LoginForm { ...defaultProps }/>
        <Axios/>
        <ContactUsForm/> 
      </div>
    );
  }
}

export default App;

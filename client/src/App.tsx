import React from 'react';
import { Axios } from "./Axios";
import { ContactUsForm } from "./ContactUs";
import { BitcoinNavbar } from "./Navbar";
import LoginForm from "./LoginForm";

function noop() {
  return;
}

class App extends React.Component {
  public render() {
    return (
      <div className="mt-3">
        <BitcoinNavbar/>
        <LoginForm
          shouldRemember={true}
          onPasswordChange={noop}
          onRememberChange={noop}
          onSubmit={noop}
          onUsernameChange={noop}
        />
        <Axios/>
        <ContactUsForm/> 
      </div>
    );
  }
}

export default App;

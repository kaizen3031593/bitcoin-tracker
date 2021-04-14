import React from 'react';
import { Axios } from "./Axios";
import { ContactUsForm } from "./ContactUs";
import { BitcoinNavbar } from "./Navbar";
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="mt-3">
        <BitcoinNavbar/>
        <Axios/>
        <ContactUsForm/> 
      </div>
    );
  }
}

export default App;

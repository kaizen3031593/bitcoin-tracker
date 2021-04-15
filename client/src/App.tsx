import React from 'react';
import { Axios } from "./Axios";
import { ContactUsForm } from "./ContactUs";
import { BitcoinNavbar } from "./Navbar";
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

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

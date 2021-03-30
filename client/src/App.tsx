import React from 'react';
import { Axios } from "./Axios";
import { ContactUsForm } from "./ContactUs";
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="mt-3">
        {/* TODO - reference "contact us" form*/}
        <Axios/>
        <ContactUsForm/> 
      </div>
    );
  }
}

export default App;

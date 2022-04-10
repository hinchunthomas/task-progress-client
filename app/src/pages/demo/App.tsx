import React from 'react';
import logo from '../../assets/icons/logo.svg';
import './App.css';
import Form from '../../components/form/form'

function App() {

  function checkTaskList(tasksJSON: string) {
    console.log({ tasksJSON })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title-container">
          {/* TO-LEARN: Add image to the src without the whole image file path */}
          <img
            src={ logo }
            className="App-logo"
            alt="logo"
          />
          <div className="App-title">
            Task Progress Report Generation
          </div>
          <img
            src={ logo }
            className="App-logo"
            alt="logo"
          />
        </div>
        <div className="App-description">
          Add the link of your task(s) and the report will be generated for you! <br /><br />
          Good luck on your task! <br />
        </div>
        {/* Pass props to the child components */}
        <Form checkTaskList={ checkTaskList } />
      </header>
    </div>
  );
}

export default App;

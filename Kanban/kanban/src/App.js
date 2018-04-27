import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './Components/todos'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <Todo />
        </header>
        
      </div>
    );
  }
}

export default App;

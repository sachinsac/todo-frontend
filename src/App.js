import React, { useContext } from 'react';

import logo from './logo.svg';
import './App.css';

import { TodoContext } from './context/TodoContext';
import { TodoList } from './todoList'

function App() {

  const { connectWallet, updateTodoStatus, currentAccount, todoData, createTodo } = useContext(TodoContext);


  const handleChange = () => {
    const title = document.querySelector("#title").value;

    if(!title)
      return

    createTodo(title)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
       
      </header>
      {!currentAccount && 
        <div>
         <button onClick={connectWallet}>Connect</button>
        </div>
      }
      {
        currentAccount && 
        <p>connected to {currentAccount} </p>
      }
      <div>
        <input type="text" name="title" id="title"/>
        <button onClick={handleChange}>Add to List</button>
        {
          todoData.length > 0 && 
          <TodoList todolists={todoData} updatestatus={updateTodoStatus}></TodoList>
        }
      </div>
    </div>
  );
}

export default App;

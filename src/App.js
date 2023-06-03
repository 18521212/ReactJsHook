import logo from './logo.svg';
import './App.css';
import Nav from './views/Nav';
import { useState, useEffect } from 'react';
import Todos from './views/Todos';
import Covid from './views/Covid';
import { CountDown, NewCountDown } from './views/Countdown';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Blog from './views/Blog';
import DetailBlog from './views/DetailBlog';
import AddNewBlog from './views/AddNewBlog';
import NotFound from './views/NotFound';
import YoutubeSearch from './views/YoutubeSearch';

function App() {
  const handleEventClick = (event) => {
    console.log('click', event.target.value)
    setName2(name)
    if (!name) {
      alert('empty')
      return
    }
    let todo = {
      id: Math.floor((Math.random() * 100000) + 1),
      title: name,
      type: 'react'
    }
    setTodos([...todos, todo])
    setName('')
  }
  const [name, setName] = useState('name')
  const [name2, setName2] = useState('')
  const handleOnchangeInput = (event) => {
    setName(event.target.value)
    console.log('click', event.target.value)
  }
  const [todos, setTodos] = useState([
    { id: '1', title: 'react', type: 'react' },
    { id: '2', title: 'git', type: 'git' }
  ])
  const deleteTodo = (id) => {
    let todo = todos
    todo = todo.filter(item => item.id != id)
    setTodos(todo)
  }
  useEffect(() => {
    //setName('name')
    console.log('effect')
  }, [todos])
  const onTimesup = () => {
    alert('times up')
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
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
          {/* <CountDown onTimesup={onTimesup} />
          <hr />
          <NewCountDown onTimesup={onTimesup} />
          <Covid /> */}
          {/* <Todos 
            todos = {todos}
            deleteTodo = {deleteTodo}
          />
          <Todos 
            todos={todos.filter(item => item.type=='react')}
            deleteTodo = {deleteTodo}
          /> */}

        </header>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Covid />} />
          <Route path="/timer" element={<><CountDown onTimesup={onTimesup} /> <NewCountDown onTimesup={onTimesup} /> </>} />
          <Route path="/todo"
            element={
              <>
                <Todos todos={todos} title={'All todos'} deleteTodo={deleteTodo} />
                <input type='text' value={name} onChange={(event) => handleOnchangeInput(event)}></input>
                <button type='button' onClick={(event) => handleEventClick(event)}>Click</button>
              </>} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<DetailBlog />} />
          <Route path="/add-new-blog" element={<AddNewBlog />} />
          <Route path='/secret' element={<YoutubeSearch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './components/app';
import TodoItem from './todoitem'

class App extends Component {
  constructor() {
    super()

    this.setState = {
      todos: []
    }
  }

  renderTodos = () => {
    return this.setState.todos.map(todo => {
      return (
        <TodoItem key={todo.id} todo={todo} />
      )
    })
  }

  componentDidMount() {
    axios
      .get('https://pjp-flask-todo.herokuapp.com/todos')
      .then(response => this.setState({
        todos: response.data
      })
      )
      .catch(err => console.warn("Fetch Todo Err: ", err))
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <div />

        {this.renderTodos()}
      </div>
    )
  }
}

ReactDOM.render(
  <App />
  , document.querySelector('.app-wrapper'));
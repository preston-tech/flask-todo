import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './components/app';
import TodoItem from './todoitem'

class App extends Component {
  constructor() {
    super()

    this.setState = {
      todo: "",
      todos: []
    }
  }

  deleteTodo = id => {
    axios
      .delete(`https://pjp-flask-todo.herokuapp.com/todos/${id}`)
      .then(
        this.setState({
          todos: this.state.todos.filter(todo => {
            return todo.id !== id
          })
        })
      )
      .catch(err => console.warn("deleteTodo error: ", err))
  }

  addTodo = e => {
    e.preventDefault()

    axios('https://pjp-flask-todo.herokuapp.com/todos', {
      title: this.state.todo,
      done: false
    })
    .then(data => {
      this.setState({
        todos: [...this.state.todos, res.data],
        todo: ""
      })
    })
    .catch(err => console.warn("addTodo Error; ", err))
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
    console.log(this.state.todos)
    return (
      <div className="app">
        <h1>Todo App</h1>
        <from className="add-todo" onSubmit={this.addTodo}></from>
        <div />

        {this.renderTodos()}
      </div>
    )
  }
}

ReactDOM.render(
  <App />
  , document.querySelector('.app-wrapper'));
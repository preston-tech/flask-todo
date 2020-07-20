import React, { Component } from 'react';
import axios from 'axios';

class TodoItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            done: props.item.done
        }
    }

    toggleDone = () => {
        const {id, title, done} = this.props.todo

        axios.patch(`https://pjp-flask-todo.herokuapp.com/todos${id}`,
        {
            done: !done
        }
    )
    .then(
        this.setState({
            done: !done
        })
    )
        .catch(err => console.warn("toggleDone err ", err))
    }
    render() {
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                onClick={this.toggleDone}
                defaultChecked={this.state.done}
            />
            <p className={this.state.done ? "done" : null}>{this.props.todo.title}</p>

            <button>X</button>
        </div>
    )
}}

export default TodoItem
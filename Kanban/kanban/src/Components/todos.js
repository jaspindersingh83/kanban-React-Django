import React, { Component } from "react";
import Task from "./task.js";
import axios from "axios";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: {
        title: "",
        isDone: 0,
        isDoing: 0
      }
    };
  }
  async componentWillMount() {
    const url = 'http://127.0.0.1:8000/api/tasks/'
    let alltasks = await axios.get(url)
    await this.setState({
      tasks: alltasks.data
    })
  }
  markDone = async key => {
    let newTasks = [...this.state.tasks];
    if (newTasks[key].isDone && !newTasks[key].isDoing) {
      newTasks[key].isDone = 0;
      newTasks[key].isDoing = 1;
    } else {
      newTasks[key].isDone = 1;
      newTasks[key].isDoing = 0;
    }
    await this.setState({ tasks: newTasks });
  };
  markTodo = async key => {
    let newTasks = [...this.state.tasks];
    if (!newTasks[key].isDone && !newTasks[key].isDoing) {
      newTasks[key].isDone = 0;
      newTasks[key].isDoing = 1;
    } else {
      newTasks[key].isDone = 0;
      newTasks[key].isDoing = 0;
    }
    await this.setState({ tasks: newTasks });
  };

  handleInput = async e => {
    e.preventDefault();
    await this.setState({
      newTask: {
        title: e.target.value,
        isDone: 0,
        isDoing: 0
      }
    });
  };
  addTask = async e => {
    e.preventDefault();
    const url = 'http://127.0.0.1:8000/api/tasks/'
    const newTask = this.state.newTask;
    await axios.post(url,newTask)
    const allTask = [...this.state.tasks, newTask];
    await this.setState({
      tasks: allTask,
      newTask: {
        title: "",
        isDone: 0,
        isDoing: 0
      }
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.addTask}>
          <input
            type="text"
            placeholder="Enter new Task"
            onChange={this.handleInput}
            value={this.state.newTask.title}
          />
        </form>
        {this.state.tasks.map((task, i) => {
          return (
            <Task
              key={i}
              id={i}
              title={task.title}
              isDone={task.isDone}
              isDoing={task.isDoing}
              markDone={this.markDone}
              markTodo={this.markTodo}
            />
          );
        })}
      </div>
    );
  }
}

export default Todo;

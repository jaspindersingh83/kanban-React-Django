import React, { Component } from "react";
class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.id,
      title: props.title,
      isDone: props.isDone,
      isDoing: props.isDoing,
      textColor: "red",
      button1text: "Mark Doing",
      button2text: "Mark Done"
    };
  }
  async componentWillReceiveProps(nextProps) {
    await this.setState({
      isDone: nextProps.isDone,
      isDoing: nextProps.isDoing
    });
  }
  changeStyle = () => {
    if (this.state.isDone) {
      this.setState({
        textColor: "green",
        button1text: "Mark Todo",
        button2text: "Mark Doing"
      });
    } else if (this.state.isDoing) {
      this.setState({
        textColor: "yellow",
        button1text: "Mark Todo",
        button2text: "Mark Done"
      });
    } else {
      this.setState({
        textColor: "red",
        button1text: "Mark Doing",
        button2text: "Mark Done"
      });
    }
  };
  markDone = async () => {
    await this.props.markDone(this.state.key);
    await this.changeStyle();
  };
  markTodo = async () => {
    await this.props.markTodo(this.state.key);
    await this.changeStyle();
  };
  render() {
    return (
      <div>
        <h2 style={{ color: this.state.textColor }}>{this.state.title}</h2>
        <button style={{}} onClick={this.markTodo}>
          {this.state.button1text}
        </button>
        <button style={{}} onClick={this.markDone}>
          {this.state.button2text}
        </button>
      </div>
    );
  }
}

export default Task;

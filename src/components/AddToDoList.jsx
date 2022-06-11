import React, { Component } from 'react';
import {
  FaCheck,
  FaMinus,
  FaPencilAlt,
  FaSortUp,
  FaSortDown,
} from 'react-icons/fa';
import FinishedDiv from './FinishedDiv';
import CorrectToDo from './CorrectTodo';
class AddToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: this.props.isDone,
      isFinished: true,
    };
  }
  updateInfo = e => {
    this.props.updateToDo(this.props.id, e);
  };
  updateIsFinished = () => {
    return this.setState({ isFinished: !this.state.isFinished });
  };
  upClick = () => this.props.up(this.props.id);
  downClick = () => this.props.down(this.props.id);
  render() {
    return (
      <li key={this.props.id} className={`glass one-item  `}>
        <span
          className={`${
            this.props.importance === 'high'
              ? 'high-imp'
              : this.props.importance === 'medium'
              ? 'medium-imp'
              : 'low-imp'
          } span`}
        ></span>
        {/* <div className='info'>
          <h3>{this.props.taskName.toUpperCase()}</h3>
          <p>{this.props.description}</p>
        </div> */}
        {this.state.isFinished ? (
          <FinishedDiv
            taskName={this.props.taskName}
            description={this.props.description}
            isDone={this.state.isDone}
          />
        ) : (
          <CorrectToDo
            id={this.props.id}
            taskName={this.props.taskName}
            description={this.props.description}
            importance={this.props.importance}
            isDone={this.state.isDone}
            updateIsFinished={this.updateIsFinished}
            updateInfo={this.updateInfo}
          />
        )}
        <div className='buttons'>
          <button
            className='btn btn-item'
            onClick={() => this.setState({ isDone: !this.state.isDone })}
          >
            <FaCheck />
          </button>
          <button
            className='btn btn-item'
            onClick={() => this.props.deleteOne(this.props.id)}
          >
            <FaMinus />
          </button>
          <button
            className='btn btn-item'
            onClick={() =>
              this.setState({ isFinished: !this.state.isFinished })
            }
          >
            <FaPencilAlt />
          </button>
          <button className='btn btn-item' onClick={this.upClick}>
            <FaSortUp />
          </button>
          <button className='btn btn-item' onClick={this.downClick}>
            <FaSortDown />
          </button>
        </div>
      </li>
    );
  }
}

export default AddToDoList;

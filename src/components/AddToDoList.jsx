import React, { Component } from 'react';
import {
  FaCheck,
  FaMinus,
  FaPencilAlt,
  FaSortUp,
  FaSortDown,
} from 'react-icons/fa';
import CorrectToDo from './CorrectTodo';
class AddToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinished: true,
    };
  }

  updateIsFinished = () =>
    this.setState({ isFinished: !this.state.isFinished });

  render() {
    return (
      <li key={this.props.id} className={`glass one-item  `}>
        <span
          className={`${
            this.props.importance === 'high'
              ? 'high-imp'
              : this.props.importance === 'medium'
              ? 'medium-imp'
              : this.props.importance === 'low'
              ? 'low-imp'
              : ''
          } span`}
        ></span>
        {this.state.isFinished ? (
          <>
            <div className='info'>
              <h3>{this.props.taskName.toUpperCase()}</h3>
              <p>{this.props.description}</p>
              {this.props.isDone && <p className='done'>Done!</p>}
            </div>
          </>
        ) : (
          <CorrectToDo
            id={this.props.id}
            taskName={this.props.taskName}
            description={this.props.description}
            importance={this.props.importance}
            isDone={this.props.isDone}
            updateIsFinished={this.updateIsFinished}
            updateInfo={e => this.props.updateToDo(this.props.id, e)}
          />
        )}
        <div className='buttons'>
          <button
            className='btn btn-item'
            onClick={() => this.props.doneToggle(this.props.id)}
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
          <button
            className='btn btn-item'
            onClick={() => this.props.upOrDown(this.props.id, 'up')}
          >
            <FaSortUp />
          </button>
          <button
            className='btn btn-item'
            onClick={() => this.props.upOrDown(this.props.id, 'down')}
          >
            <FaSortDown />
          </button>
        </div>
      </li>
    );
  }
}

export default AddToDoList;

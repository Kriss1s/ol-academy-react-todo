import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa';

export default class CorrectTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      taskName: this.props.taskName,
      description: this.props.description,
      importance: this.props.importance,
      isDone: this.props.isDone,
    };
  }

  saveCorrectTodo = () => {
    this.props.updateInfo(this.state);
    this.props.updateIsFinished();
  };
  render() {
    return (
      <div className='div'>
        <input
          className='task-name'
          type='text'
          placeholder='Task Name'
          value={this.state.taskName}
          onChange={e => {
            this.setState({ taskName: e.target.value });
          }}
        />
        <textarea
          className='textArea'
          placeholder='Task Description'
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
        ></textarea>

        <div className='radio-block'>
          <p className='radio-text'>level of importance</p>
          <div className='radio-btns-block'>
            <label htmlFor='high'>
              <span className='high-imp'></span>
              <input
                type='radio'
                name='importance'
                className='high'
                id='high'
                value='high'
                onChange={e => this.setState({ importance: e.target.value })}
              />
              High
              <p>
                <FaCheck />
              </p>
            </label>
            <label htmlFor='medium'>
              <span className='medium-imp'></span>
              <input
                type='radio'
                className='medium'
                name='importance'
                id='medium'
                value='medium'
                onChange={e => this.setState({ importance: e.target.value })}
              />
              Medium
              <p>
                <FaCheck />
              </p>
            </label>
            <label htmlFor='low'>
              <span className='low-imp'></span>
              <input
                type='radio'
                name='importance'
                className='low'
                id='low'
                value='low'
                onChange={e => this.setState({ importance: e.target.value })}
              />
              Low
              <p>
                <FaCheck />
              </p>
            </label>
          </div>
        </div>
        <button className='btn save-btn' onClick={this.saveCorrectTodo}>
          Save
        </button>
      </div>
    );
  }
}

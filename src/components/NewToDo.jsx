import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa';
class NewToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      taskName: '',
      description: '',
      importance: '',
      isDone: false,
    };
  }

  generateNewId = () => {
    const indexesArray = [];
    this.props.state.todos.forEach(element => {
      indexesArray.push(element.id);
    });

    const newId =
      this.props.state.todos.length === 0 ? 0 : Math.max(...indexesArray) + 1;
    return newId;
  };

  checknewItem = name => {
    const value = this.props.state.todos.every(e => e.taskName !== name);
    return value;
  };
  addNewItem = () => {
    // if (this.props.state.todos.length === 0) {
    const newTodos = [...this.props.state.todos];

    // }
    const checkedName = this.checknewItem(this.state.taskName);

    if (checkedName && this.state.taskName !== '') {
      newTodos.push(this.state);
      this.props.saveNewToDo(newTodos);
      this.setState({
        id: '',
        taskName: '',
        description: '',
        importance: '',
        isDone: false,
      });
    }
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
            const newId = this.generateNewId();
            this.setState({ id: newId, taskName: e.target.value });
          }}
        />
        {/* { ? (
          <p className=''> Please write different </p>
        ) : (
          <></>
        )} */}
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
        <button className='btn save-btn' onClick={this.addNewItem}>
          Save
        </button>
      </div>
    );
  }
}

export default NewToDo;

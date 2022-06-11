import React, { Component } from 'react';
import { FaMoon, FaPlus, FaSun, FaMinus } from 'react-icons/fa';
import NewToDo from './components/NewToDo.jsx';
import PlusButton from './components/PlusButton.jsx';
import AddToDoList from './components/AddToDoList.jsx';
class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isClickOnPlus: false,
    isError: '',
    isClickOnDelete: false,
    todos: [],
    toDelete: [],
  };
  addToDoForm = () => this.setState({ isClickOnPlus: true });
  saveNewToDo = e => {
    this.setState({ isClickOnPlus: false });
  };
  deleteOne = id => {
    const newTodos = this.state.todos.filter(e => e.id !== id);
    return this.setState({ todos: [...newTodos] });
  };
  deleteDone = () => {
    const newTodos = this.state.todos.filter(e => e.isDone !== true);
    return this.setState({ todos: [...newTodos] });
  };
  deleteAll = () => {
    return this.setState({ todos: [] });
  };

  choose = () => {
    return this.setState({ isClickOnDelete: !this.state.isClickOnDelete });
  };
  updateToDo = (id, newInfo) => {
    let newIndex;
    this.state.todos.forEach((elem, index) => {
      if (elem.id === id) {
        newIndex = index;
        return newIndex;
      }
    });
    this.state.todos.splice(newIndex, 1, newInfo);
    return this.setState({ todos: this.state.todos });
  };
  addToDeleteArray = id => {
    if (this.state.toDelete.every(e => e !== id)) {
      this.state.toDelete.push(id);
    } else {
      const toCut = this.state.toDelete.indexOf(id);
      this.state.toDelete.splice(toCut, 1);
    }
  };

  deleteSome = () => {
    this.choose();
    this.state.toDelete.forEach(eDelete => {
      this.state.todos.map((e, index) => {
        if (e.id === eDelete) {
          this.state.todos.splice(index, 1);
        }
      });
    });
  };

  up = id => {
    if (this.state.todos.length !== 0) {
      this.state.todos.map((e, index) => {
        if (e.id === id) {
          const newOne = this.state.todos.splice(index, 1);
          console.log(newOne[0]);
          this.state.todos.splice(index - 1, 0, newOne[0]);
        }
      });
      console.log(this.state.todos);
      return this.setState({ todos: this.state.todos });
    }
  };
  down = id => {
    this.state.todos.map((e, index) => {
      if (e.id === id) {
        const newOne = this.state.todos.splice(index, 1);
        console.log(newOne[0]);
        this.state.todos.splice(index + 1, 0, newOne[0]);
      }
    });
    console.log(this.state.todos);
    return this.setState({ todos: this.state.todos });
  };
  // checkName = (id) => {
  //   if(id)
  // };

  render() {
    return (
      <section className='dark-mode main-container'>
        <div className='left-side'>
          <h2>Add new task</h2>
          <div className='add-todo-block glass'>
            {this.state.isClickOnPlus ? (
              <NewToDo
                saveNewToDo={this.saveNewToDo}
                state={this.state}
                checkName={this.checkName}
              />
            ) : (
              <PlusButton addToDoForm={this.addToDoForm} />
            )}
          </div>
        </div>
        <div className='right-side'>
          <ul className='add-list'>
            <h2>Tasks</h2>
            <div className='delete-buttons'>
              <button className='btn delete-btn glass' onClick={this.deleteAll}>
                Delete All
              </button>
              <button
                className='btn delete-btn glass'
                onClick={this.deleteDone}
              >
                Delete Done
              </button>
              {this.state.isClickOnDelete === false ? (
                <button className='btn delete-btn glass' onClick={this.choose}>
                  Delete some
                </button>
              ) : (
                <button
                  className='btn delete-btn glass'
                  onClick={this.deleteSome}
                >
                  Delete
                </button>
              )}
            </div>
            {this.state.todos.map(elem => (
              <div key={elem.id} className='li-div'>
                {this.state.isClickOnDelete && (
                  <input
                    type='checkbox'
                    className='checkbox'
                    onChange={() => this.addToDeleteArray(elem.id)}
                  />
                )}
                <AddToDoList
                  // key={elem.id}
                  {...elem}
                  saveNewToDo={this.saveNewToDo}
                  deleteOne={this.deleteOne}
                  updateToDo={this.updateToDo}
                  up={this.up}
                  down={this.down}
                />
              </div>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default App;

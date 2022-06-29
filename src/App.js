import React, { Component } from 'react';
import NewToDo from './components/NewToDo.jsx';
import PlusButton from './components/PlusButton.jsx';
import AddToDoList from './components/AddToDoList.jsx';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickOnPlus: false,
      isError: '',
      isClickOnDelete: false,
      todos: [],
      toDelete: [],
    };
  }

  addToDoForm = () => this.setState({ isClickOnPlus: true });

  saveNewToDo = newTodos =>
    this.setState({ todos: [...newTodos], isClickOnPlus: false });

  deleteOne = id => {
    const newTodos = this.state.todos.filter(e => e.id !== id);
    return this.setState({ todos: [...newTodos] });
  };

  doneToggle = id => {
    const newTodos = [...this.state.todos];
    newTodos.forEach(e => {
      if (e.id === id) {
        e.isDone = !e.isDone;
        this.setState({ todos: [...newTodos] });
      }
    });
  };
  deleteDone = () => {
    const newTodos = this.state.todos.filter(e => e.isDone !== true);
    this.setState({ todos: [...newTodos] });
  };

  deleteAll = () => this.setState({ todos: [] });

  chooseItem = () =>
    this.setState({ isClickOnDelete: !this.state.isClickOnDelete });

  updateToDo = (id, newInfo) => {
    let newIndex;
    this.state.todos.forEach((elem, index) => {
      if (elem.id === id) {
        newIndex = index;
      }
    });
    const newTodo = [...this.state.todos];
    newTodo.splice(newIndex, 1, newInfo);
    this.setState({ todos: [...newTodo] });
  };

  addToDeleteArray = id => {
    const newToDelete = [...this.state.toDelete];
    if (newToDelete.every(e => e !== id)) {
      newToDelete.push(id);
    } else {
      const toCut = newToDelete.indexOf(id);
      newToDelete.splice(toCut, 1);
    }
    this.setState({ toDelete: [...newToDelete] });
  };

  deleteSome = () => {
    this.chooseItem();
    const newTodo = this.state.todos;
    this.state.toDelete.forEach(eDelete => {
      newTodo.map((e, index) => {
        if (e.id === eDelete) {
          newTodo.splice(index, 1);
        }
      });
    });
    this.setState({ todos: [...newTodo] });
  };

  upOrDown = (id, type) => {
    const newTodos = [...this.state.todos];
    console.log(newTodos);
    this.state.todos.forEach((e, index) => {
      let check;
      let newIndex;
      if (type === 'up') {
        check = index !== 0;
      } else if (type === 'down') {
        check = index !== newTodos.length - 1;
      }
      if (check && e.id === id) {
        const newOne = newTodos.splice(index, 1);
        newIndex = type === 'up' ? index - 1 : index - 1 + 2;
        console.log(newIndex);
        newTodos.splice(newIndex, 0, newOne[0]);
        return;
      }
    });
    return this.setState({ todos: [...newTodos] });
  };

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
                <button
                  className='btn delete-btn glass'
                  onClick={this.chooseItem}
                >
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
                  upOrDown={this.upOrDown}
                  doneToggle={this.doneToggle}
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

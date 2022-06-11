import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

class PlusButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='plus-wrapper' onClick={this.props.addToDoForm}>
        <FaPlus className='icon' />
      </div>
    );
  }
}
export default PlusButton;

import React, { Component } from 'react';
class FinishedDiv extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='info'>
        <h3>{this.props.taskName.toUpperCase()}</h3>
        <p>{this.props.description}</p>
        {this.props.isDone && <p className='done'>Done!</p>}
      </div>
    );
  }
}
export default FinishedDiv;

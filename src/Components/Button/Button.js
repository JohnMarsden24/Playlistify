import React from 'react';
import './Button.css';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.buttonMethod();
  };

  render() {
    return (
      <button
      onClick={this.handleClick}
      className="button">
      {this.props.text}
      </button>
    )
  }
}

export default Button;

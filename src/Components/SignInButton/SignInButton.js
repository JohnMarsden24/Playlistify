import React from 'react';

class SignInButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.login();
  };

  render() {
    return (
      <button onClick={this.handleClick}>Sign in</button>
    )
  }
}

export default SignInButton;

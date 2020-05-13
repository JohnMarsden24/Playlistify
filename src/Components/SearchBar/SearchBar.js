import React from 'react';
import './SearchBar.css';

import Button from '../Button/Button';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term)
  };

  handleTermChange(event) {
    this.setState({term: event.target.value});
    // this.props.onSearch(event.target.value);
  };

  render() {
    return (
      <div className="searchBar">
        <input placeholder="Enter a song, album or artist" onChange={this.handleTermChange} />
        <Button buttonMethod={this.search} text="Search" />
      </div>
    )
  }
};

export default SearchBar;

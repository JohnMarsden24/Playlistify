import React from 'react';
import './SearchResults.css';

import Tracklist from '../Tracklist/Tracklist'

class SearchResults extends React.Component {
  render() {

    let content = "mee"
    if (this.props.searchResults.length > 0) {
      content = <Tracklist
                  tracks={this.props.searchResults}
                  onAdd={this.props.onAdd}
                  isRemoval={false}/>
    } else {
      content = <p>Start a search to view results</p>
    }

    return (
      <div className="tracklist">
        <h2>Results</h2>
        {content}
      </div>
    )
  }
};

export default SearchResults

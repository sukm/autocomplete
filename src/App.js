import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search';
import { autocomplete } from './autocomplete';

export default class App extends Component {
  componentDidMount() {
    axios
      .get('http://127.0.0.1:8080/?search')
      .then((result) => {
        autocomplete.buildTrie(result.data);
        console.info('Successfully built the trie');
      })
      .catch((error) => console.info(error));
  }

  render() {
    return (
      <div className="search">
        <Search />
      </div>
    );
  }
}

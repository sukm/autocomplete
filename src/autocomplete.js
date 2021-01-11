import Trie from './trie';
import { sortSuggestions } from './util';

class Autocomplete {
  constructor() {
    this.trie = new Trie();
  }
  buildTrie(data) {
    data.forEach((userData) => {
      this.trie.insert(userData);
    });
  }
  input(text) {
    const suggestions = this.trie.search(text);
    return sortSuggestions(suggestions);
  }
}

const autocomplete = new Autocomplete();

export { autocomplete };

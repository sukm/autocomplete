import has from 'has';
import { weightName, normalizeText } from './util';

class TrieNode {
  constructor() {
    this.children = {};
    this.data = [];
    this.weight = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(user) {
    Object.entries(user).forEach((arr) => {
      if (arr[0] !== 'id') {
        let node = this.root;
        const weight = arr[0] === 'name' ? 0 : -1;
        const text = normalizeText(arr[1]);
        for (let i = 0; i < text.length; i += 1) {
          const character = text[i];
          if (!has(node.children, character)) {
            node.children[character] = new TrieNode();
          }
          node = node.children[character];
        }
        node.weight = weight;
        node.data.push(user);
      }
    });
  }

  traverse(node, path, prefix, seen, suggestions) {
    node.data.forEach((userData) => {
      const { email, name } = userData;
      if (!seen.has(email)) {
        const weight = node.weight - weightName(name, prefix);
        suggestions.push([weight, name, email]);
        seen.add(email);
      }
    });
    for (const character in node.children) {
      this.traverse(
        node.children[character],
        path + character,
        prefix,
        seen,
        suggestions
      );
    }
  }

  search(prefix) {
    prefix = normalizeText(prefix);
    let node = this.root;
    let path = '';
    for (let i = 0; i < prefix.length; i += 1) {
      const character = prefix[i];
      if (!has(node.children, character)) {
        return [];
      }
      path += character;
      node = node.children[character];
    }
    if (path) {
      const suggestions = [];
      this.traverse(node, path, prefix, new Set(), suggestions);
      return suggestions;
    }
    return [];
  }
}

export default Trie;

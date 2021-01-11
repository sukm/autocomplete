import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { autocomplete } from './autocomplete';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm] = useDebounce(searchTerm, 300);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (debouncedTerm) {
      const suggestions = autocomplete.input(debouncedTerm);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedTerm]);

  return (
    <>
      <input
        type="text"
        className="search-box"
        placeholder="Search"
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <ul className="search-suggestions">
        {suggestions.map((user, i) => {
          const [name, email] = user;
          return (
            <div key={i}>
              <ol>
                {name}, {email}
              </ol>
            </div>
          );
        })}
      </ul>
    </>
  );
}

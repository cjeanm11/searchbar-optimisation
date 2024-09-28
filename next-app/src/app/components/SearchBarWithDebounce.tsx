"use client";

import React, { useState, useEffect } from 'react';

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBarWithDebounce: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery) {
        setLoading(true);
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${debouncedQuery}`);
          const data = await response.json();
          setResults(data.results || []);
        } catch (error) {
          console.error('Error fetching data:', error);
          setResults([]); 
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]); 
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a character..."
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBarWithDebounce;
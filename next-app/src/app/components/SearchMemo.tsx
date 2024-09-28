"use client";

import React, { useState, useEffect, useMemo } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
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
  }, [query]);

  const memoizedResults = useMemo(() => results, [results]);

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
        {memoizedResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(SearchBar);
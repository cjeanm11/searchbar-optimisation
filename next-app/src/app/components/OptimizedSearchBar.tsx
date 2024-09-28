'use client'; 

import React, { useState, useEffect } from 'react';

interface OptimizedSearchBarProps {
  onSearchResults: (results: { id: number; name: string }[]) => void;
}

const OptimizedSearchBar: React.FC<OptimizedSearchBarProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<{ [key: string]: any }>({});
  const [results, setResults] = useState<{ id: number; name: string }[]>([]); // State to hold results

  const fetchResults = async (searchQuery: string) => {
    if (searchQuery.trim() && !loading) {
      setLoading(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
        const data = await response.json();

        if (response.ok) {
          setCache((prev) => ({ ...prev, [searchQuery]: data.results || [] }));
          setResults(data.results || []); 
          onSearchResults(data.results || []);
        } else {
          throw new Error(data.error || 'Failed to fetch results');
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch results. Please try again later.');
        onSearchResults([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query && !cache[query]) {
        fetchResults(query);
      } else if (cache[query]) {
        setResults(cache[query]); 
        onSearchResults(cache[query]);
      }
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
  }, [query, cache, onSearchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setError(null); 
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a character..."
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {results.length > 0 && (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OptimizedSearchBar;
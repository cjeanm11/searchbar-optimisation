// pages/Home.tsx
'use client'; 

import React, { Suspense, lazy } from 'react';
import SearchBar from "./components/SearchBar";
import SearchBarWithDebounce from "./components/SearchBarWithDebounce";
import SearchMemo from "./components/SearchMemo";
import OptimizedSearchBar from "./components/OptimizedSearchBar";

const LazySearchBarWithDebounce = lazy(() => import('./components/SearchBarWithDebounce'));

export default function Home() {
  return (
    <div className="home">
      <div className="wrapper grid grid-cols-1 md:grid-cols-1 gap-5 p-4">
        {/* 1. */}
        <div className="col-span-1">
          <h1 className="text-lg font-bold">
            1. React Search Bar Functionality.
          </h1>
        </div>
        <div className="col-span-1">
          <p>
            Use an input field and manage its state with useState. Make an API
            call (e.g., using fetch) to retrieve search results based on user
            input.
          </p>
        </div>
        <div className="col-span-1">
          <SearchBar />
        </div>
        {/* 2. */}
        <div className="col-span-1">
          <h1 className="text-lg font-bold">
            2. Debouncing for Performance Optimization
          </h1>
        </div>
        <div className="col-span-1">
          <p>
            Use setTimeout to delay the API call and clearTimeout to reset the timer on each keystroke.
          </p>
        </div>
        <div className="col-span-1">
          <SearchBarWithDebounce />
        </div>
        {/* 3. */}
        <div className="col-span-1">
          <h1 className="text-lg font-bold">
            3. Lazy Loading
          </h1>
        </div>
        <div className="col-span-1">
          <p>
            Use React’s React.lazy and Suspense to load components on demand. For images, consider libraries like react-lazyload.
          </p>
        </div>
        <div className="col-span-1">
          <Suspense fallback={<div>Loading...</div>}>
            <LazySearchBarWithDebounce />
          </Suspense>
        </div>
        {/* 4. */}
        <div className="col-span-1">
          <h1 className="text-lg font-bold">
            4. Memoization
          </h1>
        </div>
        <div className="col-span-1">
          <p>
            Use React.memo for components and useMemo for values to avoid unnecessary re-renders.
          </p>
        </div>
        <div className="col-span-1">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchMemo />
          </Suspense>
        </div>
        {/* 5. Caching and throttling */}
        <div className="col-span-1">
          <h1 className="text-lg font-bold">
            5. Caching and Throttling
          </h1>
        </div>
        <div className="col-span-1">
          <p>
            Caching stores previous results for faster access, while throttling limits API calls during typing, ensuring a smooth and efficient search process.        
          </p>
        </div>
        <div className="col-span-1">
          <OptimizedSearchBar onSearchResults={(results) => console.log(results)} />
        </div>
      </div>
    </div>
  );
}
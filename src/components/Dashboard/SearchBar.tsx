// components/Dashboard/SearchBar.tsx
'use client'
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch(query, location);
  };

  return (
    <div className="bg-[#0E0E23] py-6 px-6 flex flex-col items-center">
      <div className="flex w-full max-w-4xl gap-4">
        <input
          type="text"
          placeholder="Search Job Title"
          className="w-full px-4 py-2 rounded-md bg-white text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full px-4 py-2 rounded-md bg-white text-black"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button 
          className="bg-purple-600 text-white px-6 rounded-md hover:bg-purple-700 flex items-center gap-2"
          onClick={handleSearch}
        >
          <FaSearch />
          Search
        </button>
      </div>
    </div>
  )
}
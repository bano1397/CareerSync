'use client'

import { FaSearch } from 'react-icons/fa'

export default function SearchBar() {
  return (
    <div className="bg-[#0E0E23] py-6 px-6 flex flex-col items-center">
      <div className="flex w-full max-w-4xl gap-4">
        <input
          type="text"
          placeholder="Search Job Title"
          className="w-full px-4 py-2 rounded-md bg-white text-black"
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full px-4 py-2 rounded-md bg-white text-black"
        />
        <button className="bg-purple-600 text-white px-6 rounded-md hover:bg-purple-700 flex items-center gap-2">
          <FaSearch />
          Search
        </button>
      </div>
    </div>
  )
}

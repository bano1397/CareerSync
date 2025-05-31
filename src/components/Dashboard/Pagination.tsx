// components/Dashboard/Pagination.tsx
'use client';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button 
        className="text-sm px-4 py-2 border rounded hover:bg-gray-100"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        ← Prev
      </button>
      <span className="text-sm px-4 py-2">Page {currentPage}</span>
      <button 
        className="text-sm px-4 py-2 border rounded hover:bg-gray-100"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </button>
    </div>
  );
}
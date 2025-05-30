'use client';

export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button className="text-sm px-4 py-2 border rounded hover:bg-gray-100">← Prev</button>
      <button className="text-sm px-4 py-2 border rounded hover:bg-gray-100">Next →</button>
    </div>
  );
}

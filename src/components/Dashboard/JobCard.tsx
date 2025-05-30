// components/Dashboard/JobCard.tsx
'use client';
import { Bookmark } from 'lucide-react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
}

export default function JobCard({ title, company, location, description, tags }: JobCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-200 relative">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{company}</p>
          <p className="text-xs text-gray-400 mt-1">{location}</p>
        </div>
        <button className="text-gray-400 hover:text-purple-600">
          <Bookmark size={18} />
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-3 line-clamp-3">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

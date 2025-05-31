// components/Dashboard/JobCard.tsx
'use client';
import { Bookmark } from 'lucide-react';

interface JobCardProps {
  job: {
    job_title: string;
    employer_name: string;
    employer_logo?: string;
    job_description: string;
    job_employment_type: string;
    job_location: string;
    job_posted_at: string;
  };
  onClick: () => void;
}

export default function JobCard({ job, onClick }: JobCardProps) {
  return (
    <div 
      className="bg-white p-4 rounded-xl shadow border border-gray-200 relative cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{job.job_title}</h3>
          <p className="text-sm text-gray-500">{job.employer_name}</p>
          <p className="text-xs text-gray-400 mt-1">{job.job_location}</p>
        </div>
        {job.employer_logo && (
          <img 
            src={job.employer_logo} 
            alt={job.employer_name} 
            className="w-10 h-10 object-contain rounded"
          />
        )}
      </div>
      <p className="text-sm text-gray-600 mt-3 line-clamp-3">{job.job_description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
          {job.job_employment_type}
        </span>
        <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
          {job.job_posted_at}
        </span>
      </div>
      <button 
        className="absolute top-4 right-4 text-gray-400 hover:text-purple-600"
        onClick={(e) => {
          e.stopPropagation();
          // Handle bookmark logic here
        }}
      >
        <Bookmark size={18} />
      </button>
    </div>
  );
}
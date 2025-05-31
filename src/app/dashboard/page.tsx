// app/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SearchBar from "@/components/Dashboard/SearchBar";
import JobCard from "@/components/Dashboard/JobCard";
import Pagination from "@/components/Dashboard/Pagination";
import JobDetailsModal from '@/components/Dashboard/JobDetailsModal';
// top of file
import Lottie from "lottie-react";
import loadingAnimation from "@/components/loadingAnimation.json";


interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string;
  job_description: string;
  job_employment_type: string;
  job_location: string;
  job_posted_at: string;
  job_apply_link: string;
  job_salary?: {
    min_salary?: number;
    max_salary?: number;
    salary_period?: string;
  };
  job_highlights?: {
    Qualifications?: string[];
    Benefits?: string[];
    Responsibilities?: string[];
  };
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchParams, setSearchParams] = useState({
    query: 'developer jobs in chicago',
    page: 1,
    num_pages: 1,
    country: 'us'
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(searchParams.query)}&page=${searchParams.page}&num_pages=${searchParams.num_pages}&country=${searchParams.country}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '5473e8f597msh203402c1f6f2c59p1284c7jsn8ba625dc85b8',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          }
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch jobs');
      
      const data = await response.json();
      setJobs(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const handleSearch = (query: string, location: string) => {
    setSearchParams(prev => ({
      ...prev,
      query: `${query} jobs in ${location}`,
      page: 1
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }));
  };

  if (loading) return (
  <div className="min-h-screen bg-[#0C111F] text-white p-4 flex items-center justify-center">
    <div className="text-center flex flex-col items-center">
      <div className="w-40 h-40 mb-6">
        <Lottie 
          animationData={loadingAnimation}
          loop
          autoplay
        />
      </div>
      <br />
      <p className="text-xl">Loading your personalized dashboard...</p>
    </div>
  </div>
);


  if (error) return (
    <div className="min-h-screen bg-[#0C111F] text-white p-4 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-red-400">Error: {error}</p>
        <button 
          onClick={fetchJobs}
          className="mt-4 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0C111F] text-white px-4 pb-20">
      <div className="max-w-7xl mx-auto pt-8">
        {/* Personalized Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session?.user?.name || 'User'}!
          </h1>
          <p className="text-gray-300">
            Here are the personalized job recommendations based on your profile.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />
        
        <h2 className="text-xl font-semibold mb-4 mt-6">
          {searchParams.query}
        </h2>
        
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No jobs found. Try a different search.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard 
                  key={job.job_id} 
                  job={job}
                  onClick={() => setSelectedJob(job)}
                />
              ))}
            </div>
            <Pagination 
              currentPage={searchParams.page}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      <footer className="text-center text-sm text-gray-400 mt-16">
        © {new Date().getFullYear()} CareerSync. All rights reserved.
      </footer>
    </main>
  );
}
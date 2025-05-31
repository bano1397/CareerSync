// components/Dashboard/JobDetailsModal.tsx
'use client';
import { X, Bookmark, ExternalLink, MessageCircle } from 'lucide-react';
import ChatBot from '../Chatbot';
import { useEffect, useState } from 'react';

interface JobDetailsModalProps {
  job: {
    job_title: string;
    employer_name: string;
    employer_logo?: string;
    job_description: string;
    job_employment_type: string;
    job_location: string;
    job_posted_at: string;
    job_apply_link: string;
    job_highlights?: {
      Qualifications?: string[];
      Benefits?: string[];
      Responsibilities?: string[];
    };
    job_salary?: {
      min_salary?: number;
      max_salary?: number;
      salary_period?: string;
    };
  };
  onClose: () => void;
}

export default function JobDetailsModal({ job, onClose }: JobDetailsModalProps) {
  const [initialBotMessage, setInitialBotMessage] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    // Set the initial bot message when job details are opened
    console.log("Job data in modal:", job.job_title, job.employer_name);
    const message = `Hello! I see you're interested in the "${job.job_title}" position at ${job.employer_name}. 

I can help you with:
• Expected salary range for this role
• Related job opportunities  
• Interview preparation tips
• Resume optimization advice
• Questions about job requirements

Feel free to ask me anything about this position or your application process!`;
    
    setInitialBotMessage(message);
  }, [job]);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() =>
    {
        console.log("Initital Message",initialBotMessage)
    })
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Main Job Details Section */}
        <div className={`${isChatbotOpen ? 'w-2/3' : 'w-full'} overflow-y-auto transition-all duration-300`}>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{job.job_title}</h2>
                <p className="text-lg text-gray-600">{job.employer_name}</p>
                <p className="text-gray-500 mt-2">{job.job_location}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={toggleChatbot}
                  className={`p-2 rounded-lg transition-colors ${
                    isChatbotOpen 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                  title="Toggle AI Assistant"
                >
                  <MessageCircle size={20} />
                </button>
                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {job.employer_logo && (
              <img 
                src={job.employer_logo} 
                alt={job.employer_name} 
                className="mt-4 max-h-20 max-w-full"
              />
            )}

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Job Description</h3>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{job.job_description}</p>
            </div>

            {job.job_highlights && (
              <div className="mt-6">
                {job.job_highlights.Responsibilities && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Responsibilities</h3>
                    <ul className="mt-2 list-disc list-inside">
                      {job.job_highlights.Responsibilities.map((item, i) => (
                        <li key={i} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.job_highlights.Qualifications && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Qualifications</h3>
                    <ul className="mt-2 list-disc list-inside">
                      {job.job_highlights.Qualifications.map((item, i) => (
                        <li key={i} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.job_highlights.Benefits && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Benefits</h3>
                    <ul className="mt-2 list-disc list-inside">
                      {job.job_highlights.Benefits.map((item, i) => (
                        <li key={i} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                {job.job_employment_type}
              </span>
              <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                Posted: {job.job_posted_at}
              </span>
              {job.job_salary && (
                <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                  Salary: {job.job_salary.min_salary ? `${job.job_salary.min_salary} - ${job.job_salary.max_salary} ${job.job_salary.salary_period}` : 'Not specified'}
                </span>
              )}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <a 
                href={job.job_apply_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <ExternalLink size={18} />
                Apply Now
              </a>
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Bookmark size={18} />
                Save Job
              </button>
            </div>
          </div>
        </div>

        {/* ChatBot Section */}
        {isChatbotOpen && (
          <div className="w-1/3 border-l border-gray-200 flex flex-col bg-gray-50">
            <div className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center">
              <span className="font-medium">Career Assistant</span>
              <button 
                onClick={toggleChatbot}
                className="hover:bg-purple-700 p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 flex flex-col">
              <ChatBot 
                initialMessage={initialBotMessage}
                jobContext={job}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
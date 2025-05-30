// app/dashboard/page.tsx
import SearchBar from "@/components/Dashboard/SearchBar";
import JobCard from "@/components/Dashboard/JobCard";
import Pagination from "@/components/Dashboard/Pagination";

export default function DashboardPage() {
  const jobs = [
    {
      title: "Python Web Back-end Developer",
      company: "JobsBridge",
      location: "Austin, TX, US",
      description:
        "Jobs Bridge Inc is among the fastest growing IT staffing / professional services organizations with its own job portal.",
      tags: ["Full-time", "On-site", "TBD"],
    },
    {
      title: "Python Developer",
      company: "JTC Infotech",
      location: "Richardson, TX, US",
      description:
        "ROLE: Python Developer. This role requires the candidate to be on premise during regular Business Hours.",
      tags: ["Full-time", "On-site", "TBD"],
    },
    {
      title: "Python Developer",
      company: "Vitol",
      location: "Houston, TX, US",
      description:
        "Vitol is a leader in the energy sector with a presence across the spectrum: from oil through to power, renewables and carbon.",
      tags: ["Full-time", "On-site", "TBD"],
    },
    {
      title: "Full Stack Python Developer",
      company: "CGI Group, Inc.",
      location: "Dallas, TX, US",
      description:
        "CGI is seeking a Full-Stack Python Developer with experience developing and deploying apps on cloud platforms like Azure/AWS.",
      tags: ["Full-time", "Remote", "$90.7k - $91.5k/yearly"],
    },
    {
      title: "Django Python Developer",
      company: "Tipaz",
      location: "Plano, TX, US",
      description:
        "Python/Django web developer needed for a startup team that is revolutionizing the consumer finance space.",
      tags: ["Full-time", "Remote", "TBD"],
    },
    {
      title: "Entry Level Python Programmer/Data Scientist",
      company: "SynergisticIT",
      location: "Fort Worth, TX, US",
      description:
        "SYNERGISTICIT is aware that the Job Market is Challenging. We aim to bridge the talent gap with thousands of tech job seekers.",
      tags: ["Full-time", "On-site", "TBD"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#0C111F] text-white px-4 pb-20">
      <div className="pt-6">
        <SearchBar />
        <h2 className="text-xl font-semibold max-w-7xl mx-auto mb-4">
          Searched Jobs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {jobs.map((job, i) => (
            <JobCard key={i} {...job} />
          ))}
        </div>
        <Pagination />
      </div>

      <footer className="text-center text-sm text-gray-400 mt-16">
        © 2024 CareerSync. All rights reserved.
      </footer>
    </main>
  );
}

import React, { useState } from 'react';
import { useAuthStore } from './store/authStore';
import { useJobStore } from './store/jobStore';
import { JobCard } from './components/JobCard';
import { JobModal } from './components/JobModal';
import { SearchFilters } from './components/SearchFilters';
import { Pagination } from './components/Pagination';
import { LoginPage } from './components/LoginPage';
import { Toaster } from 'react-hot-toast';
import { LogOut, Rocket } from 'lucide-react';
import { Job } from './types';

function App() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { isAuthenticated, logout } = useAuthStore();
  const {
    jobs,
    filterOptions,
    sortOption,
    currentPage,
    itemsPerPage,
    setCurrentPage,
  } = useJobStore();

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        <LoginPage />
      </>
    );
  }

  // Filter and sort jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesLocation = !filterOptions.location || 
      job.location.toLowerCase().includes(filterOptions.location.toLowerCase());
    const matchesSalary = job.salary >= filterOptions.minSalary;
    const matchesIndustry = !filterOptions.industry ||
      job.industry.toLowerCase() === filterOptions.industry.toLowerCase();
    return matchesLocation && matchesSalary && matchesIndustry;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOption === 'recent') {
      return new Date(b.posted).getTime() - new Date(a.posted).getTime();
    }
    return b.salary - a.salary;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Rocket className="text-indigo-600" size={24} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                CareerLaunch
              </h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Filters */}
        <div className="mb-8">
          <SearchFilters />
        </div>

        {/* Job List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={() => setSelectedJob(job)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>

      {/* Job Modal */}
      {selectedJob && (
        <JobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}

export default App;
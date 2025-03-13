import React from 'react';
import { Job } from '../types';
import { Bookmark, BookmarkCheck, Building2, MapPin, IndianRupee } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import toast from 'react-hot-toast';

interface JobCardProps {
  job: Job;
  onViewDetails: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  const { savedJobs, toggleSaveJob } = useJobStore();
  const isSaved = savedJobs.has(job.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveJob(job.id);
    toast.success(isSaved ? 'Job removed from saved jobs' : 'Job saved successfully');
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onViewDetails}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <Building2 size={18} />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <MapPin size={18} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <IndianRupee size={18} />
            <span>{job.salary} LPA</span>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {isSaved ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
        </button>
      </div>
      <div className="mt-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
          {job.industry}
        </span>
      </div>
      {job.applicationStatus && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700">
            Status: {job.applicationStatus}
          </span>
        </div>
      )}
    </div>
  );
};
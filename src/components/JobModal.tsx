import React from 'react';
import { Job } from '../types';
import { X, Building2, MapPin, IndianRupee, Calendar } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import toast from 'react-hot-toast';

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  const { updateApplicationStatus } = useJobStore();

  const handleStatusChange = (status: Job['applicationStatus']) => {
    updateApplicationStatus(job.id, status);
    toast.success('Application status updated');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 size={18} />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <IndianRupee size={18} />
              <span>{job.salary} LPA</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <span>Posted: {new Date(job.posted).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            <p className="mt-2 text-gray-700">{job.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Application Status</h3>
            <div className="mt-3 flex gap-2">
              {['saved', 'applied', 'interviewing', 'accepted', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status as Job['applicationStatus'])}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    job.applicationStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
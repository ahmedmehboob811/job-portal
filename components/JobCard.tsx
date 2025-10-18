
import React, { useState } from 'react';
import { Job, Company, UserRole } from '../types';
import ApplyModal from './ApplyModal';
import { useUser } from '@clerk/clerk-react';
import { BuildingOfficeIcon, MapPinIcon, BriefcaseIcon } from './Icons';

interface JobCardProps {
  job: Job;
  company?: Company;
}

const JobCard: React.FC<JobCardProps> = ({ job, company }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const handleApplyClick = () => {
    if (!isSignedIn) {
      alert("Please sign in as a student to apply.");
      return;
    }
    if (user?.publicMetadata?.role !== UserRole.STUDENT) {
      alert("Only students can apply for jobs.");
      return;
    }
    setIsModalOpen(true);
  };
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col border border-transparent hover:shadow-xl hover:-translate-y-1 hover:border-primary transition-all duration-300">
        <div className="flex items-start gap-4">
          <img src={company?.logoUrl} alt={`${company?.name} logo`} className="w-14 h-14 rounded-full border" />
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary-light rounded-full mb-2">
              {job.category}
            </span>
            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <BuildingOfficeIcon className="h-5 w-5" />
              <span>{company?.name}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mt-3 border-t pt-3">
            <div className="flex items-center gap-1.5">
                <MapPinIcon className="h-4 w-4" />
                <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <BriefcaseIcon className="h-4 w-4" />
                <span>{job.experienceLevel}</span>
            </div>
        </div>
        
        <p className="text-gray-600 mt-3 flex-grow">{job.description}</p>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleApplyClick}
            className="px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
      {isModalOpen && <ApplyModal job={job} company={company} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default JobCard;

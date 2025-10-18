
import React, { useState, useMemo } from 'react';
import { Job } from '../types';
import { COMPANIES, JOB_CATEGORIES, JOB_LOCATIONS, EXPERIENCE_LEVELS } from '../constants';
import JobCard from './JobCard';

interface JobListingsProps {
  jobs: Job[];
}

const JobListings: React.FC<JobListingsProps> = ({ jobs }) => {
  const [filters, setFilters] = useState({
    category: 'All',
    location: 'All',
    experienceLevel: 'All',
    searchTerm: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const { category, location, experienceLevel, searchTerm } = filters;
      const searchTermLower = searchTerm.toLowerCase();

      const companyName = (COMPANIES.find(c => c.id === job.companyId)?.name || '').toLowerCase();

      return (
        (category === 'All' || job.category === category) &&
        (location === 'All' || job.location === location) &&
        (experienceLevel === 'All' || job.experienceLevel === experienceLevel) &&
        (job.title.toLowerCase().includes(searchTermLower) ||
         job.description.toLowerCase().includes(searchTermLower) ||
         companyName.includes(searchTermLower))
      );
    });
  }, [jobs, filters]);

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Next Opportunity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="searchTerm"
            placeholder="Search by title, company..."
            value={filters.searchTerm}
            onChange={handleFilterChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            {JOB_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <select
            name="experienceLevel"
            value={filters.experienceLevel}
            onChange={handleFilterChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            {EXPERIENCE_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => {
            const company = COMPANIES.find(c => c.id === job.companyId);
            return <JobCard key={job.id} job={job} company={company} />;
          })}
        </div>
      ) : (
        <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">No Jobs Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters to find more opportunities.</p>
        </div>
      )}
    </div>
  );
};

export default JobListings;

import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { APPLICATIONS } from '../constants';
import ResumeAnalyzer from './ResumeAnalyzer';
import { UserIcon, DocumentTextIcon, ChevronDownIcon, PlusCircleIcon } from './Icons';
import PostJobForm from './PostJobForm';
import { Job } from '../types';

interface RecruiterDashboardProps {
  jobs: Job[];
  onJobPosted: (newJobData: { title: string; description: string; category: string; location: string; experienceLevel: string; }) => void;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ jobs, onJobPosted }) => {
  const { isSignedIn, user } = useUser();
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

  const companyId = user?.publicMetadata?.companyId as number | undefined;

  if (!isSignedIn || companyId === undefined) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Access Denied</h2>
        <p className="text-gray-500 mt-2">Please sign in as a recruiter to view this page.</p>
      </div>
    );
  }

  const handleJobPosted = (newJobData: { title: string; description: string; category: string; location: string; experienceLevel: string; }) => {
    onJobPosted(newJobData);
    setTimeout(() => {
      setIsPostJobModalOpen(false);
    }, 2000); // Close modal after 2s to allow user to see success message
  };

  const companyJobs = jobs.filter(job => job.companyId === companyId);

  return (
    <div>
       <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Recruiter Dashboard</h1>
        <button
          onClick={() => setIsPostJobModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover transition-colors"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span>Post New Job</span>
        </button>
      </div>

      <div className="space-y-8">
        {companyJobs.length > 0 ? (
          companyJobs.map(job => {
            const jobApplications = APPLICATIONS.filter(app => app.jobId === job.id);
            return (
              <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <details className="group">
                  <summary className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                    <div>
                      <h2 className="text-xl font-bold text-primary">{job.title}</h2>
                      <p className="text-gray-500">{jobApplications.length} Application(s)</p>
                    </div>
                    <ChevronDownIcon className="h-6 w-6 text-gray-400 group-open:rotate-180 transition-transform"/>
                  </summary>
                  <div className="border-t">
                    {jobApplications.length > 0 ? (
                      <ul className="divide-y">
                        {jobApplications.map(app => (
                          <li key={app.id} className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                  <div>
                                      <div className="flex items-center gap-3">
                                          <UserIcon className="h-6 w-6 text-gray-500"/>
                                          <p className="font-semibold text-gray-800">{app.userName}</p>
                                      </div>
                                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                          <DocumentTextIcon className="h-5 w-5"/>
                                          <a href="#" className="hover:underline text-primary">{app.resumeUrl}</a>
                                      </div>
                                  </div>
                              </div>
                              <ResumeAnalyzer resumeText={app.resumeText} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="p-6 text-gray-500">No applications for this job yet.</p>
                    )}
                  </div>
                </details>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700">No Job Listings Found</h2>
            <p className="text-gray-500 mt-2">You haven't posted any jobs yet. Click "Post New Job" to get started.</p>
          </div>
        )}
      </div>

      {isPostJobModalOpen && (
        <PostJobForm 
          onClose={() => setIsPostJobModalOpen(false)}
          onJobPosted={handleJobPosted}
        />
      )}
    </div>
  );
};

export default RecruiterDashboard;

import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Header from './components/Header';
import JobListings from './components/JobListings';
import RecruiterDashboard from './components/RecruiterDashboard';
import { UserRole, Job } from './types';
import { JOBS } from './constants';

type View = 'jobs' | 'dashboard';

const App: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const [view, setView] = useState<View>('jobs');
  const [jobs, setJobs] = useState<Job[]>(JOBS);

  const userRole = user?.publicMetadata?.role as UserRole;
  const companyId = user?.publicMetadata?.companyId as number | undefined;

  const handleSetView = (newView: View) => {
    if (newView === 'dashboard') {
      if (!isSignedIn) {
        alert("Please sign in to view the dashboard.");
        return;
      }
      if (userRole !== UserRole.RECRUITER) {
        alert("You must be a recruiter to view the dashboard.");
        return;
      }
    }
    setView(newView);
  };

  const handleJobPosted = (newJobData: { title: string; description: string; category: string; location: string; experienceLevel: string; }) => {
    if (!companyId) return;
    const newJob: Job = {
      id: Math.max(...jobs.map(j => j.id), 0) + 1,
      companyId: companyId,
      ...newJobData,
    };
    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <Header currentView={view} setView={handleSetView} />
      <main className="container mx-auto px-4 py-8">
        {view === 'jobs' ? <JobListings jobs={jobs} /> : <RecruiterDashboard jobs={jobs} onJobPosted={handleJobPosted}/>}
      </main>
      <footer className="bg-white border-t mt-12 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Link App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

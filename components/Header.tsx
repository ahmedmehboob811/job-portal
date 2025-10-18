
import React from 'react';
import { useUser, SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { UserRole } from '../types';
import { BriefcaseIcon } from './Icons';

interface HeaderProps {
  currentView: 'jobs' | 'dashboard';
  setView: (view: 'jobs' | 'dashboard') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role as UserRole;

  const NavLink: React.FC<{ view: 'jobs' | 'dashboard'; children: React.ReactNode }> = ({ view, children }) => (
    <button
      onClick={() => setView(view)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        currentView === view
          ? 'bg-primary text-white'
          : 'text-gray-600 hover:bg-primary-light hover:text-primary'
      }`}
    >
      {children}
    </button>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <BriefcaseIcon className="h-7 w-7" />
            <span>Link App</span>
          </div>
          <div className="hidden md:flex items-center gap-2 border-l pl-4 ml-2">
            <NavLink view="jobs">Find a Job</NavLink>
            <SignedIn>
              {userRole === UserRole.RECRUITER && <NavLink view="dashboard">Recruiter Dashboard</NavLink>}
            </SignedIn>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SignedIn>
             <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
                <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-hover transition-colors">
                    Sign In
                </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
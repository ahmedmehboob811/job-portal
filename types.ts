
export enum UserRole {
  STUDENT = 'student',
  RECRUITER = 'recruiter',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  companyId?: number;
}

export interface Company {
  id: number;
  name: string;
  logoUrl: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  companyId: number;
  category: string;
  location: string;
  experienceLevel: string;
}

export interface Application {
  id: number;
  jobId: number;
  userId: number;
  resumeUrl: string;
  resumeText: string; // For AI analysis
  userName: string;
}

export interface AnalysisResult {
  strengths: string[];
  weaknesses: string[];
  summary: string;
}
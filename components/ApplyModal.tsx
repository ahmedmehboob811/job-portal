
import React, { useState } from 'react';
import { Job, Company } from '../types';
import { XMarkIcon, UploadIcon } from './Icons';

interface ApplyModalProps {
  job: Job;
  company?: Company;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ job, company, onClose }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic validation for PDF
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        setResumeFile(null);
      } else {
        setError(null);
        setResumeFile(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setError('Please upload your resume.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    // Simulate API call for application submission
    setTimeout(() => {
      console.log(`Submitting application for ${job.title} with resume: ${resumeFile.name}`);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <XMarkIcon className="h-6 w-6" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-accent mb-4">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">You have successfully applied for the {job.title} position.</p>
            <button onClick={onClose} className="w-full max-w-xs mx-auto px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800">Apply for {job.title}</h2>
            {company && <p className="text-gray-500 mt-1">at {company.name}</p>}

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Your Resume (PDF only)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    {resumeFile ? (
                      <p className="text-sm text-green-600 mt-2">{resumeFile.name}</p>
                    ) : (
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    )}
                  </div>
                </div>
                 {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !resumeFile}
                  className="px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;

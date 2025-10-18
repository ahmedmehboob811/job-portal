
import React, { useState } from 'react';
import { JOB_CATEGORIES, JOB_LOCATIONS, EXPERIENCE_LEVELS } from '../constants';
import { XMarkIcon } from './Icons';

interface PostJobFormProps {
  onClose: () => void;
  onJobPosted: (newJobData: { title: string; description: string; category: string; location: string; experienceLevel: string; }) => void;
}

const PostJobForm: React.FC<PostJobFormProps> = ({ onClose, onJobPosted }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    experienceLevel: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const jobCategories = JOB_CATEGORIES.filter(c => c !== 'All');
  const jobLocations = JOB_LOCATIONS.filter(l => l !== 'All');
  const experienceLevels = EXPERIENCE_LEVELS.filter(e => e !== 'All');

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    if (!formData.category) newErrors.category = 'Please select a category.';
    if (!formData.location) newErrors.location = 'Please select a location.';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Please select an experience level.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onJobPosted(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <XMarkIcon className="h-6 w-6" />
        </button>

        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-accent mb-4">Job Posted!</h2>
            <p className="text-gray-600 mb-6">Your new job listing for "{formData.title}" is now live.</p>
            <button onClick={onClose} className="w-full max-w-xs mx-auto px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    >
                      <option value="" disabled>Select a category</option>
                      {jobCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <select
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    >
                      <option value="" disabled>Select a location</option>
                      {jobLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                  </div>

                  <div>
                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">Experience Level</label>
                    <select
                      name="experienceLevel"
                      id="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary ${errors.experienceLevel ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    >
                      <option value="" disabled>Select a level</option>
                      {experienceLevels.map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                    {errors.experienceLevel && <p className="mt-1 text-sm text-red-600">{errors.experienceLevel}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
                  <textarea
                    name="description"
                    id="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-hover disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PostJobForm;

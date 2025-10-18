
import React, { useState } from 'react';
import { analyzeResume } from '../services/geminiService';
import { AnalysisResult } from '../types';
import { SparklesIcon, CheckCircleIcon, XCircleIcon, InformationCircleIcon } from './Icons';

interface ResumeAnalyzerProps {
  resumeText: string;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ resumeText }) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeResume(resumeText);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      {!analysis && (
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md font-semibold hover:opacity-90 disabled:bg-gray-400 transition-opacity"
        >
          <SparklesIcon className="h-5 w-5" />
          {isLoading ? 'Analyzing with AI...' : 'Analyze Resume'}
        </button>
      )}

      {error && <p className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
      
      {analysis && (
        <div className="mt-4 space-y-4 animate-fade-in">
            <h4 className="font-bold text-lg text-gray-700">AI Resume Analysis</h4>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                    <InformationCircleIcon className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5"/>
                    <div>
                        <h5 className="font-semibold text-blue-800">Summary</h5>
                        <p className="text-blue-700">{analysis.summary}</p>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                     <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5"/>
                    <div>
                        <h5 className="font-semibold text-green-800">Strengths</h5>
                        <ul className="list-disc list-inside space-y-1 text-green-700">
                            {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                    <XCircleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5"/>
                    <div>
                        <h5 className="font-semibold text-yellow-800">Areas for Improvement</h5>
                        <ul className="list-disc list-inside space-y-1 text-yellow-700">
                            {analysis.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { RecentHistory } from './components/RecentHistory';
import { checkDrugStatus } from './services/geminiService';
import { DrugAnalysis, HistoryItem } from './types';
import { AlertOctagon } from 'lucide-react';

const App: React.FC = () => {
  const [currentResult, setCurrentResult] = useState<DrugAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentResult(null);

    try {
      const result = await checkDrugStatus(query);
      setCurrentResult(result);
      
      // Add to history
      const newHistoryItem: HistoryItem = {
        ...result,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      
      setHistory(prev => {
        const filtered = prev.filter(h => h.drugName.toLowerCase() !== result.drugName.toLowerCase());
        return [newHistoryItem, ...filtered].slice(0, 6);
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleHistorySelect = (item: HistoryItem) => {
    setCurrentResult(item);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20">
      <Header />

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero / Search Section */}
        <div className="text-center mb-10 space-y-4">
           <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
             Check Controlled Substance Status
           </h2>
           <p className="text-slate-600 text-lg max-w-2xl mx-auto">
             Instantly verify if a drug is controlled, prescription-only, or OTC using advanced AI analysis aligned with regulatory standards.
           </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mt-8 bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
            <AlertOctagon className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Result Section */}
        <div className="mt-12">
          {currentResult && <ResultCard data={currentResult} />}
        </div>

        {/* History Section */}
        <RecentHistory history={history} onSelect={handleHistorySelect} />

      </main>

      {/* Footer / Disclaimer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <p className="text-sm text-slate-500">
            <strong>Disclaimer:</strong> This tool uses Artificial Intelligence to analyze drug statuses based on general international regulatory data (e.g., NDLEA, DEA, WHO). 
            It is for informational purposes only and does not constitute legal or medical advice. 
            Always consult official government gazettes or a qualified professional for verification.
          </p>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} DrugCheck Sentinel.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

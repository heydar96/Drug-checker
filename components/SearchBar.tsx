import React, { useState, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSearch(input.trim());
    }
  }, [input, isLoading, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
        <div className="relative bg-white rounded-xl shadow-xl flex items-center p-2 border border-slate-100">
          <Search className="text-slate-400 ml-3" size={20} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter drug name (e.g., Tramadol, Codeine)..."
            className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 py-3 text-slate-900 placeholder-slate-400 outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Analyze'}
          </button>
        </div>
      </div>
      <p className="text-center text-slate-500 text-sm mt-3">
        AI-powered check against controlled substance lists.
      </p>
    </form>
  );
};

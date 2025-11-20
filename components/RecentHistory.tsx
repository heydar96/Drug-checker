import React from 'react';
import { HistoryItem, ControlStatus } from '../types';
import { Clock, ArrowRight } from 'lucide-react';

interface RecentHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const RecentHistory: React.FC<RecentHistoryProps> = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-12">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        <Clock size={16} />
        Recent Searches
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="group text-left bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-200 transition-all flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                {item.drugName}
              </p>
              <p className={`text-xs font-medium mt-1 ${
                item.status === ControlStatus.CONTROLLED ? 'text-red-600' : 
                item.status === ControlStatus.PRESCRIPTION_ONLY ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {item.status.replace('_', ' ')}
              </p>
            </div>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-500 transform group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};

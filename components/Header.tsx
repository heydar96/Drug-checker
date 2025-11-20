import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-600 p-2 rounded-lg text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-none">DrugCheck</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">Sentinel System</p>
          </div>
        </div>
        <nav>
          <a 
            href="#" 
            className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Help & Guidelines
          </a>
        </nav>
      </div>
    </header>
  );
};

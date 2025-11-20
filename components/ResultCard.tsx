import React from 'react';
import { DrugAnalysis, ControlStatus } from '../types';
import { AlertTriangle, CheckCircle, FileWarning, Pill, Info } from 'lucide-react';

interface ResultCardProps {
  data: DrugAnalysis;
}

const StatusBadge: React.FC<{ status: ControlStatus }> = ({ status }) => {
  switch (status) {
    case ControlStatus.CONTROLLED:
      return (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full border border-red-100">
          <AlertTriangle size={20} className="fill-red-100 stroke-red-600" />
          <span className="font-bold">CONTROLLED SUBSTANCE</span>
        </div>
      );
    case ControlStatus.PRESCRIPTION_ONLY:
      return (
        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full border border-amber-100">
          <FileWarning size={20} />
          <span className="font-bold">PRESCRIPTION ONLY</span>
        </div>
      );
    case ControlStatus.OTC:
      return (
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-100">
          <CheckCircle size={20} />
          <span className="font-bold">NOT CONTROLLED (OTC)</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full border border-slate-200">
          <Info size={20} />
          <span className="font-bold">STATUS UNKNOWN</span>
        </div>
      );
  }
};

const ColorHeader: React.FC<{ status: ControlStatus; children: React.ReactNode }> = ({ status, children }) => {
  let bgClass = 'bg-slate-800';
  if (status === ControlStatus.CONTROLLED) bgClass = 'bg-gradient-to-r from-red-600 to-red-700';
  else if (status === ControlStatus.PRESCRIPTION_ONLY) bgClass = 'bg-gradient-to-r from-amber-500 to-amber-600';
  else if (status === ControlStatus.OTC) bgClass = 'bg-gradient-to-r from-emerald-500 to-emerald-600';

  return <div className={`${bgClass} p-6 text-white`}>{children}</div>;
};

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ColorHeader status={data.status}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{data.drugName}</h2>
            {data.scientificName && (
              <p className="text-white/80 font-mono text-sm mt-1">{data.scientificName}</p>
            )}
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1">
             <StatusBadge status={data.status} />
          </div>
        </div>
      </ColorHeader>

      <div className="p-6 grid gap-6 md:grid-cols-2">
        
        {/* Main Classification Info */}
        <div className="space-y-4 md:col-span-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Classification & Reason</h3>
                <div className="flex items-start gap-3">
                    <Pill className="text-brand-500 mt-1 shrink-0" size={24} />
                    <div>
                        <p className="font-semibold text-slate-900 text-lg">{data.classification}</p>
                        <p className="text-slate-600 leading-relaxed">{data.reason}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Legal */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 md:col-span-2">
           <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Legal Implications</h3>
           <p className="text-slate-700 leading-relaxed">{data.legalImplications}</p>
        </div>

        {/* Common Uses */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Common Uses</h3>
          <ul className="space-y-2">
            {data.commonUses.map((use, idx) => (
              <li key={idx} className="flex items-center gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
                {use}
              </li>
            ))}
          </ul>
        </div>

        {/* Safety Warnings */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Safety Warnings</h3>
          <ul className="space-y-2">
            {data.safetyWarnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                <span className="text-sm">{warning}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

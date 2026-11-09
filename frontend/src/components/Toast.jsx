import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md ${
        isSuccess 
          ? 'bg-[#141417]/95 border-emerald-500/40 text-emerald-300' 
          : 'bg-[#141417]/95 border-brand-crimson/50 text-red-300'
      }`}>
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" />
        )}
        <div className="flex-1 text-xs">
          <p className="font-bold uppercase tracking-wider text-white mb-0.5">
            {isSuccess ? 'Success' : 'Notice'}
          </p>
          <p className="text-zinc-300 leading-relaxed">{toast.message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-zinc-400 hover:text-white transition p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}


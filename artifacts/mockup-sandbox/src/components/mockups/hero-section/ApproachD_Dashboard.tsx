import React from 'react';
import { Activity, Users, Box, Zap, ArrowUpRight, BarChart3 } from 'lucide-react';

export function ApproachD_Dashboard() {
  return (
    <div className="min-h-screen bg-[#F7F7F8] font-sans text-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight mb-1">Platform Overview</h1>
            <p className="text-slate-500 text-sm">Real-time status of Collective OS systems.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors">
              Documentation
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-colors">
              Launch Workspace
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Main Hero Widget (Spans 2x2) */}
          <div className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-semibold uppercase tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> System Active
              </div>
              <h2 className="text-4xl font-semibold tracking-tight mb-4 text-slate-900">
                The Operating System<br/>for Creativity.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 max-w-md">
                Access generative pipelines, physics-based UI components, and spatial audio tools from a single, unified dashboard interface.
              </p>
              <div className="flex gap-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-3xl font-semibold">24ms</span>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Avg Pipeline Latency</span>
                </div>
                <div className="w-px bg-slate-100 mx-2" />
                <div className="flex flex-col">
                  <span className="text-3xl font-semibold">99.9%</span>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Node Uptime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stat Widgets */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-indigo-200 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Users size={20} /></div>
              <ArrowUpRight size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <div>
              <div className="text-slate-500 text-sm font-medium mb-1">Active Creators</div>
              <div className="text-2xl font-semibold">1,204</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-indigo-200 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl"><Box size={20} /></div>
              <ArrowUpRight size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <div>
              <div className="text-slate-500 text-sm font-medium mb-1">Physics Components</div>
              <div className="text-2xl font-semibold">84</div>
            </div>
          </div>

          {/* Wide Activity Widget */}
          <div className="md:col-span-3 lg:col-span-2 bg-slate-900 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent pointer-events-none" />
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm"><Zap size={20} className="text-indigo-300" /></div>
                <div className="font-medium">Generative Pipeline Status</div>
              </div>
              <Activity size={18} className="text-indigo-400" />
            </div>
            <div className="relative z-10">
              <div className="h-16 flex items-end gap-1.5 opacity-80">
                {[40, 70, 45, 90, 65, 85, 30, 50, 75, 100, 60, 80].map((val, i) => (
                  <div key={i} className="flex-1 bg-indigo-400 rounded-t-sm" style={{ height: `${val}%` }} />
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-3 font-medium tracking-wide">
                <span>Model: Flux.1 Dev</span>
                <span>Load: High</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
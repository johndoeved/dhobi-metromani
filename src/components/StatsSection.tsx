/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users, Crown, ShieldAlert, DollarSign, ArrowUpRight, TrendingUp } from 'lucide-react';
import { MatrimonyUser, PremiumSubscription, MatrimonyReport } from '../types';

interface StatsSectionProps {
  users: MatrimonyUser[];
  subscriptions: PremiumSubscription[];
  reports: MatrimonyReport[];
}

export default function StatsSection({ users, subscriptions, reports }: StatsSectionProps) {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const premiumUsers = users.filter(u => u.membership === 'premium').length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;

  // Calculate total metrics revenue
  const totalRevenue = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + Number(s.amount || 0), 0);

  // Group signups by estimated timeline for a beautiful mini visualizer
  const genderRatio = {
    male: users.filter(u => u.gender === 'male').length,
    female: users.filter(u => u.gender === 'female').length
  };

  const totalGender = (genderRatio.male + genderRatio.female) || 1;
  const malePercent = Math.round((genderRatio.male / totalGender) * 100);
  const femalePercent = Math.round((genderRatio.female / totalGender) * 100);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users Card */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm transition hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Total Registers</p>
              <h3 className="text-3xl font-serif font-bold text-[#2d2d2d] mt-1">{totalUsers}</h3>
              <p className="text-[11px] text-emerald-600 mt-2 flex items-center gap-1 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{activeUsers} Active Profiles</span>
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-[#e2e8f0] text-[#800000]">
              <Users className="w-6 h-6 text-[#800000]" />
            </div>
          </div>
        </div>

        {/* Premium Tiers Card */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm transition hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Premium Members</p>
              <h3 className="text-3xl font-serif font-bold text-[#800000] mt-1">{premiumUsers}</h3>
              <p className="text-[11px] text-[#718096] mt-2 flex items-center gap-1 font-medium">
                <Crown className="w-3.5 h-3.5" />
                <span>{totalUsers - premiumUsers} Free members</span>
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#800000]/5 border border-[#800000]/10">
              <Crown className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
        </div>

        {/* Live Revenue Card */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm transition hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Active Revenue</p>
              <h3 className="text-3xl font-serif font-bold text-[#2d2d2d] mt-1">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </h3>
              <p className="text-[11px] text-[#718096] mt-2 flex items-center gap-1">
                <span>From {subscriptions.filter(s => s.status === 'active').length} Subscriptions</span>
              </p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700">
              <DollarSign className="w-6 h-6 text-emerald-700" />
            </div>
          </div>
        </div>

        {/* Open Reports Card */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm transition hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Abuse Reports</p>
              <h3 className="text-3xl font-serif font-bold text-[#800000] mt-1">{pendingReports}</h3>
              <p className="text-[11px] text-[#718096] mt-2 flex items-center gap-1">
                <span>{reports.filter(r => r.status === 'resolved').length} Complaints resolved</span>
              </p>
            </div>
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-100 text-rose-700">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Visualizers (Charts & Demographics Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Custom Premium Activity SVG Chart */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-serif font-semibold text-lg text-[#2d2d2d]">Monthly Registration Trend</h4>
              <p className="text-xs text-[#718096]">Dhobi Metromani user growth overview</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Realtime Sync active</span>
            </div>
          </div>

          <div className="relative pt-4 h-60 w-full">
            {/* Custom SVG Bar Chart */}
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              {/* grid lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#f0eced" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#f0eced" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#f0eced" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="0" y1="180" x2="500" y2="180" stroke="#e2e8f0" strokeWidth="1" />

              {/* Chart bars represented manually based on scaled users */}
              {/* Scale user count to fit height 140px */}
              {[
                { month: 'Jan', val: Math.min(totalUsers * 0.15 + 4, 30) },
                { month: 'Feb', val: Math.min(totalUsers * 0.3 + 8, 55) },
                { month: 'Mar', val: Math.min(totalUsers * 0.45 + 15, 80) },
                { month: 'Apr', val: Math.min(totalUsers * 0.65 + 18, 120) },
                { month: 'May', val: Math.max(totalUsers, 100) },
              ].map((item, index) => {
                const totalPlotPoints = 5;
                const barSpacing = 500 / totalPlotPoints;
                const barWidth = 35;
                const xPos = index * barSpacing + (barSpacing - barWidth) / 2;
                const heightVal = (item.val / 150) * 140; // max value assumed 150 for scale
                const yPos = 180 - heightVal;

                return (
                  <g key={item.month} className="group cursor-pointer">
                    {/* Hover tooltip hint */}
                    <rect
                      x={xPos}
                      y={yPos}
                      width={barWidth}
                      height={heightVal}
                      fill={index === 4 ? '#800000' : '#D4AF37'}
                      rx="6"
                      className="transition-all duration-300 hover:opacity-95"
                    />
                    <text
                      x={xPos + barWidth / 2}
                      y={yPos - 8}
                      textAnchor="middle"
                      className="text-[10px] font-mono font-medium fill-[#800000] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {Math.round(item.val)}
                    </text>
                    <text
                      x={xPos + barWidth / 2}
                      y="195"
                      textAnchor="middle"
                      className="text-[11px] font-sans font-medium fill-[#718096]"
                    >
                      {item.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Demographics Summary Panel */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-serif font-semibold text-lg text-[#2d2d2d]">User Demographics</h4>
            <p className="text-xs text-[#718096]">Gender & Verification statistics</p>
          </div>

          <div className="space-y-4 my-6">
            {/* Gender Ratio */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#800000]">Male Profiles ({genderRatio.male})</span>
                <span className="text-[#D4AF37]">Female Profiles ({genderRatio.female})</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                <div style={{ width: `${malePercent}%` }} className="bg-[#800000]" />
                <div style={{ width: `${femalePercent}%` }} className="bg-[#D4AF37]" />
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-[#718096] font-mono">
                <span>{malePercent}% Male</span>
                <span>{femalePercent}% Female</span>
              </div>
            </div>

            {/* Verification Statistics */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#2d2d2d]">Verified Badges</span>
                <span className="text-[#718096]">
                  {Math.round((users.filter(u => u.isVerified).length / (totalUsers || 1)) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${(users.filter(u => u.isVerified).length / (totalUsers || 1)) * 100}%` }}
                  className="bg-emerald-600 h-full"
                />
              </div>
            </div>

            {/* Account Status */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#2d2d2d]">Blocked vs Active</span>
                <span className="text-[#718096]">
                  {users.filter(u => u.status === 'blocked').length} Blocked accounts
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${(users.filter(u => u.status === 'active').length / (totalUsers || 1)) * 100}%` }}
                  className="bg-amber-500 h-full"
                />
              </div>
            </div>
          </div>

          <div className="text-xs text-center text-[#D4AF37] bg-[#800000]/5 rounded-lg py-2 font-serif font-bold">
            Dhobi Metromani Matrimonial Database System
          </div>
        </div>

      </div>
    </div>
  );
}

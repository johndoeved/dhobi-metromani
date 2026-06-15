/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Flag, Trash, ShieldCheck, CheckCircle2, RotateCcw, AlertOctagon, UserX } from 'lucide-react';
import { MatrimonyUser, MatrimonyReport } from '../types';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, updateDoc, writeBatch } from 'firebase/firestore';

interface ReportSectionProps {
  reports: MatrimonyReport[];
  users: MatrimonyUser[];
}

export default function ReportSection({ reports, users }: ReportSectionProps) {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle dispute resolutions (Pillar 4.6 Terminal state and role check)
  const handleResolve = async (report: MatrimonyReport, terminateReportingUser: boolean) => {
    setSuccessMsg('');
    setErrorMsg('');
    const targetPath = `reports/${report.reportId}`;

    try {
      const batch = writeBatch(db);

      // 1. Update Report status to resolved
      const reportRef = doc(db, 'reports', report.reportId);
      batch.update(reportRef, {
        status: 'resolved',
        updatedAt: new Date().toISOString()
      });

      // 2. Opt-in: block/lock the reported user profile from matrimonial matches
      if (terminateReportingUser) {
        const userRef = doc(db, 'users', report.reportedUserId);
        batch.update(userRef, {
          status: 'blocked',
          updatedAt: new Date().toISOString()
        });
      }

      await batch.commit();
      setSuccessMsg(`Report ${report.reportId} successfully resolved and filed.${terminateReportingUser ? ' Reported user has been blocked.' : ''}`);
    } catch (error) {
      setErrorMsg('Failed to process resolution. See system logs.');
      handleFirestoreError(error, OperationType.UPDATE, targetPath);
    }
  };

  // Handle dispute dismissals
  const handleDismiss = async (reportId: string) => {
    setSuccessMsg('');
    setErrorMsg('');
    const targetPath = `reports/${reportId}`;

    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: 'dismissed',
        updatedAt: new Date().toISOString()
      });
      setSuccessMsg(`Report ${reportId} has been dismissed as valid profile conduct.`);
    } catch (error) {
      setErrorMsg('Failed to dismiss report.');
      handleFirestoreError(error, OperationType.UPDATE, targetPath);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-6">
      
      <div className="minimal-card-accent">
        <h3 className="font-serif font-bold text-xl text-[#800000]">Abuse, Fake Profile & Spam Reports</h3>
        <p className="text-xs text-[#718096]">
          Review community disputes regarding candidate profiles. Resolve violations or dismiss safe matrimonial conduct.
        </p>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 text-emerald-800 text-xs py-2.5 px-3 rounded-xl border border-emerald-100 font-medium animate-in fade-in">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-rose-50 text-rose-800 text-xs py-2.5 px-3 rounded-xl border border-rose-100 font-medium animate-in fade-in">
          {errorMsg}
        </div>
      )}

      {/* Reports Listing Grid/Table */}
      <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-[#f5f6f8] text-[#2d2d2d] font-semibold border-b border-[#e2e8f0]">
              <th className="p-4">Report Details</th>
              <th className="p-4">Accuser</th>
              <th className="p-4">Accused Profile</th>
              <th className="p-4">Dispute Context</th>
              <th className="p-4">Verification State</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] text-[#2d2d2d]">
            {reports.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-[#718096]">
                  No active abuse or fake profile report tickets found in queue
                </td>
              </tr>
            ) : (
              reports.map((report) => {
                const reporter = users.find(u => u.uid === report.reporterId);
                const reported = users.find(u => u.uid === report.reportedUserId);

                return (
                  <tr key={report.reportId} className="hover:bg-[#f5f6f8]/60 transition">
                    
                    {/* Report Category & ID */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg ${
                          report.type === 'fake_profile' ? 'bg-amber-50 text-amber-600' :
                          report.type === 'abuse' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                        }`}>
                          <Flag className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="font-semibold capitalize text-[#2d2d2d]">{report.type.replace('_', ' ')}</p>
                          <span className="text-[9px] text-[#718096] font-mono font-medium">Ticket: #{report.reportId}</span>
                        </div>
                      </div>
                    </td>

                    {/* Accused Plaintiff */}
                    <td className="p-4">
                      {reporter ? (
                        <div>
                          <p className="font-semibold">{reporter.name}</p>
                          <span className="text-[10px] text-[#718096] font-mono">{reporter.email}</span>
                        </div>
                      ) : (
                        <span className="text-[#718096] italic">UID: {report.reporterId}</span>
                      )}
                    </td>

                    {/* Reported Target Candidate */}
                    <td className="p-4">
                      {reported ? (
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-bold text-rose-700">{reported.name}</p>
                            {reported.status === 'blocked' && (
                              <span className="text-[8px] bg-rose-100 text-rose-800 px-1 py-0.2 rounded font-bold uppercase tracking-wider">
                                BLOCKED
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#718096] font-mono">{reported.email}</span>
                        </div>
                      ) : (
                        <span className="text-[#718096] italic">UID: {report.reportedUserId}</span>
                      )}
                    </td>

                    {/* Description Text */}
                    <td className="p-4 max-w-xs">
                      <p className="text-[#2d2d2d] italic leading-relaxed line-clamp-2">
                        "{report.details}"
                      </p>
                    </td>

                    {/* Live Ticket Status */}
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${
                        report.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        report.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' :
                        'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {report.status}
                      </span>
                    </td>

                    {/* Operational Action triggers */}
                    <td className="p-4 text-right">
                      {report.status === 'pending' ? (
                        <div className="flex justify-end gap-1.5">
                          {/* Dismiss Button */}
                          <button
                            onClick={() => handleDismiss(report.reportId)}
                            title="Dismiss Complaint as invalid"
                            className="px-2.5 py-1.5 bg-[#f5f6f8] hover:bg-slate-200 text-[#718096] rounded-lg text-[10px] font-bold font-mono transition cursor-pointer"
                          >
                            DISMISS
                          </button>

                          {/* Resolve only */}
                          <button
                            onClick={() => handleResolve(report, false)}
                            title="Mark resolved without banning user"
                            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold font-mono transition cursor-pointer"
                          >
                            RESOLVE
                          </button>

                          {/* Resolve + BAN User */}
                          <button
                            onClick={() => handleResolve(report, true)}
                            title="Resolve complaint and BAN reported user"
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition cursor-pointer"
                          >
                            <UserX className="w-3.5 h-3.5 text-rose-600" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[#a0aec0] text-[11px] font-mono italic">
                          Closed Ticket
                        </span>
                      )}
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Safety warning placard */}
      <div className="bg-[#800000]/5 p-4 rounded-xl border border-[#e2e8f0] flex items-start gap-3">
        <AlertOctagon className="w-5 h-5 text-[#800000] shrink-0 mt-0.5" />
        <div className="text-xs text-[#2d2d2d] space-y-1">
          <p className="font-bold text-[#800000]">Abuse Policy Enforcement Invariant</p>
          <p className="text-[#718096] leading-relaxed">
            Resolving with the BAN flag instantly alters the matching database. When blocked, the target candidate's active live session is synchronized server-side, immediately preventing other Android application users from experiencing fraudulent messaging profiles.
          </p>
        </div>
      </div>

    </div>
  );
}

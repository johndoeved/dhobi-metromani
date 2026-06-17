/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, BellRing, Users, User, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { SystemNotification } from '../types';
import { Capacitor } from '@capacitor/core';

const API_BASE_URL = Capacitor.isNativePlatform() ? "https://dhobi-samaj-metromany.vercel.app" : "";

interface NotificationSectionProps {
  notifications: SystemNotification[];
}

export default function NotificationSection({ notifications }: NotificationSectionProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [target, setTarget] = useState<'all' | 'user'>('all');
  const [targetUserId, setTargetUserId] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmitNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setApiResponse(null);

    if (!title || !body) {
      setErrorMsg('Title and Message Body are mandatory fields.');
      return;
    }

    if (target === 'user' && !targetUserId.trim()) {
      setErrorMsg('Target User UID must be provided for single user scopes.');
      return;
    }

    setLoading(true);
    const notificationId = `notif_${Math.random().toString(36).substr(2, 9)}`;

    // Prepare Firestore payload
    const payload: SystemNotification = {
      notificationId,
      title,
      body,
      target,
      ...(target === 'user' ? { targetUserId: targetUserId.trim() } : {}),
      createdAt: new Date().toISOString()
    };

    const docPath = `notifications/${notificationId}`;

    try {
      // 1. Dispatch in real-time via Firestore so it instantly syncs to the users/Android applications (Pillar 2.2 Security Specs)
      await setDoc(doc(db, 'notifications', notificationId), payload);

      // 2. Fire full-stack backend endpoint and output returned logs info (Pillar 6 Backend integration)
      const res = await fetch(API_BASE_URL + '/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Server dispatch response rejected.');
      }

      const serverLogs = await res.json();
      setApiResponse(serverLogs);
      setSuccessMsg(`FCM Push notification published and broadcasted successfully!`);
      
      // Cleanup
      setTitle('');
      setBody('');
      setTargetUserId('');
    } catch (error) {
      setErrorMsg('Server connection/dispatch failed.');
      handleFirestoreError(error, OperationType.WRITE, docPath);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Compose Form Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm lg:col-span-2 space-y-4">
        <div className="minimal-card-accent">
          <h4 className="font-serif font-bold text-lg text-[#800000]">Draft Push Announcement</h4>
          <p className="text-xs text-[#718096]">
            Publish Firebase Cloud Messaging (FCM) live alerts instantly visible in the Dhobi Matrimony Android app.
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

        <form onSubmit={handleSubmitNotification} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Target Audience SELECT */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#718096] uppercase">Target Audience Scope</label>
              <div className="flex gap-2 mt-1">
                
                {/* Broadcast to all */}
                <button
                  type="button"
                  onClick={() => setTarget('all')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold border cursor-pointer transition ${
                    target === 'all'
                      ? 'bg-[#800000] text-white border-[#800000] border'
                      : 'bg-[#f5f6f8] text-[#2d2d2d] border-[#e2e8f0] hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Broadcast All Users</span>
                </button>

                {/* Specific individual */}
                <button
                  type="button"
                  onClick={() => setTarget('user')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold border cursor-pointer transition ${
                    target === 'user'
                      ? 'bg-[#800000] text-white border-[#800000] border'
                      : 'bg-[#f5f6f8] text-[#2d2d2d] border-[#e2e8f0] hover:bg-slate-100'
                  }`}
                >
                  <User className="w-4 h-4 text-amber-300" />
                  <span>Single User</span>
                </button>

              </div>
            </div>

            {/* Target ID if single user */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#718096] uppercase">Target User UID</label>
              <input
                type="text"
                disabled={target === 'all'}
                placeholder={target === 'all' ? 'Broadcasting universally...' : 'Enter target Firebase user UID'}
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                className="w-full bg-[#f5f6f8] disabled:opacity-50 border border-[#e2e8f0] rounded-xl p-2.5 text-xs text-[#2d2d2d] outline-none mt-1 focus:bg-white focus:border-[#D4AF37] transition"
              />
            </div>

          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#718096] uppercase">Alert Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Match of the Day! 💖"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl p-2.5 text-xs text-[#2d2d2d] outline-none mt-1 focus:bg-white focus:border-[#D4AF37] transition"
            />
          </div>

          {/* Body Paragraph */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#718096] uppercase">Message Body Text</label>
            <textarea
              required
              rows={4}
              placeholder="Draft your promotional banner or announcement content here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl p-2.5 text-xs text-[#2d2d2d] outline-none mt-1 focus:bg-white focus:border-[#D4AF37] transition"
            />
          </div>

          {/* Action Trigger */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#800000] hover:bg-[#6c0000] text-white px-6 py-2.5 rounded-xl text-xs font-semibold cursor-pointer disabled:opacity-50 transition flex items-center gap-1.5 border border-[#D4AF37] shadow-sm"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>{loading ? 'Transmitting...' : 'Dispatch FCM Channel'}</span>
            </button>
          </div>

        </form>

        {/* Server API Response Preview Panel */}
        {apiResponse && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-slate-200 font-mono text-[10px] space-y-2 animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between text-[#D4AF37] font-bold uppercase border-b border-slate-800 pb-1.5">
              <span>Secure Full-Stack Node API Logs</span>
              <span className="text-[8px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">HTTP 200 OK</span>
            </div>
            <pre className="overflow-x-auto">{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}

      </div>

      {/* Dispatched logs histories panel */}
      <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col justify-between h-full">
        <div>
          <h4 className="font-serif font-bold text-lg text-[#800000]">Broadcast Chronicle</h4>
          <p className="text-xs text-[#718096]">Live feed of historic transmission triggers</p>
        </div>

        <div className="my-4 overflow-y-auto max-h-96 divide-y divide-[#e2e8f0] flex-1 pr-1">
          {notifications.length === 0 ? (
            <p className="text-center text-[#718096] text-xs py-8 italic">No notification receipts registered</p>
          ) : (
            notifications.map((notif, idx) => (
              <div key={notif.notificationId || idx} className="py-3 flex items-start gap-2.5">
                <BellRing className="w-4 h-4 text-[#800000] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#2d2d2d]">{notif.title}</span>
                  <p className="text-[10px] text-[#718096] line-clamp-2 leading-relaxed font-sans">{notif.body}</p>
                  <div className="flex gap-2 items-center text-[9px] text-[#D4AF37] font-mono">
                    <span>Scope: {notif.target.toUpperCase()}</span>
                    <span>•</span>
                    <span>{notif.createdAt ? new Date(notif.createdAt).toLocaleTimeString() : 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-[10px] text-[#718096] bg-[#f5f6f8] py-2.5 px-3 rounded-lg text-center font-mono border border-[#e2e8f0]">
          Sync Loop: Android application listens to the matching notification collection instantly.
        </div>
      </div>

    </div>
  );
}

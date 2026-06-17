/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CreditCard, Award, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MatrimonyUser, PremiumSubscription } from '../types';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

interface SubscriptionSectionProps {
  users: MatrimonyUser[];
  subscriptions: PremiumSubscription[];
}

export default function SubscriptionSection({ users, subscriptions }: SubscriptionSectionProps) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [amount, setAmount] = useState<number>(2499);
  const [planName, setPlanName] = useState('Dhobi Gold Premium Annual');
  const [paymentMethod, setPaymentMethod] = useState('UPI Payment Gateway (Razorpay)');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Users without active premium membership
  const freeUsersAvailable = users.filter(u => u.membership !== 'premium');

  // Trigger manual subscription activation
  const handleActivatePremium = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!selectedUserId) {
      setErrorMsg('Please select a candidate first.');
      return;
    }

    const selectedUser = users.find(u => u.uid === selectedUserId);
    if (!selectedUser) {
      setErrorMsg('User not found.');
      return;
    }

    const docId = `sub_${Math.random().toString(36).substr(2, 9)}`;
    const subPayload: PremiumSubscription = {
      subscriptionId: docId,
      userId: selectedUserId,
      planName,
      amount: Number(amount),
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year duration
      paymentMethod
    };

    const subPath = `subscriptions/${docId}`;
    const userPath = `users/${selectedUserId}`;

    try {
      // 1. Write the subscription payment record (Phase 4.7 Relationship sync)
      await setDoc(doc(db, 'subscriptions', docId), subPayload);

      // 2. Update the user membership tier to 'premium'
      await updateDoc(doc(db, 'users', selectedUserId), {
        membership: 'premium',
        updatedAt: new Date().toISOString()
      });

      setSuccessMsg(`Licensing upgraded! Candidate ${selectedUser.name} is now a Premium Matrimonial Member.`);
      setSelectedUserId('');
    } catch (error) {
      setErrorMsg('Failed to update subscription. See system console.');
      handleFirestoreError(error, OperationType.WRITE, subPath);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Upper Grid: Active activations and ledger statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ledger Statistics Column */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div className="space-y-2 minimal-card-accent">
            <h4 className="font-serif font-bold text-lg text-[#800000]">Financial Ledger Summary</h4>
            <p className="text-xs text-[#718096]">Dhobi Matrimony checkout tracking stats</p>
          </div>

          <div className="space-y-4 my-6">
            <div className="bg-[#800000]/5 p-4 rounded-xl border border-[#e2e8f0] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">Gross Income</span>
                <h5 className="text-2xl font-serif font-semibold text-[#800000] mt-1">
                  ₹{subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0).toLocaleString('en-IN')}
                </h5>
              </div>
              <div className="p-2.5 bg-[#800000]/10 text-[#800000] rounded-lg">
                <CreditCard className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f5f6f8] p-3 rounded-xl border border-[#e2e8f0]">
                <span className="text-[9px] text-[#718096] uppercase font-bold">Premium Volume</span>
                <p className="text-lg font-serif font-bold text-[#2d2d2d] mt-1">
                  {users.filter(u => u.membership === 'premium').length}
                </p>
              </div>
              <div className="bg-[#f5f6f8] p-3 rounded-xl border border-[#e2e8f0]">
                <span className="text-[9px] text-[#718096] uppercase font-bold">Active Licenses</span>
                <p className="text-lg font-serif font-bold text-emerald-700 mt-1">
                  {subscriptions.filter(s => s.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-[#718096] font-mono flex items-center gap-1.5 justify-center">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>FCM notification updates triggered on premium upgrade</span>
          </div>
        </div>

        {/* Manual Upgrade Composer */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm lg:col-span-2">
          <div className="mb-4 minimal-card-accent">
            <h4 className="font-serif font-bold text-lg text-[#800000]">Activate Premium License</h4>
            <p className="text-xs text-[#718096]">Provide direct elite membership clearance to physical candidates.</p>
          </div>

          {successMsg && (
            <div className="bg-emerald-50 text-emerald-800 text-xs py-2.5 px-3 rounded-xl border border-emerald-100 font-medium mb-4 animate-in fade-in">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="bg-rose-50 text-rose-800 text-xs py-2.5 px-3 rounded-xl border border-rose-100 font-medium mb-4 animate-in fade-in">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleActivatePremium} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Candidate Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#718096] uppercase">Select Free Candidate</label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl p-2.5 text-xs text-[#2d2d2d] outline-none mt-1 focus:bg-white focus:border-[#D4AF37]"
              >
                <option value="">-- Choose Candidate --</option>
                {freeUsersAvailable.map(cu => (
                  <option key={cu.uid} value={cu.uid}>
                    {cu.name} ({cu.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Plan selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#718096] uppercase">Selected Plan Tier</label>
              <select
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl p-2.5 text-xs text-[#2d2d2d] outline-none mt-1 focus:bg-white focus:border-[#D4AF37]"
              >
                <option value="Dhobi Gold Premium Annual">Dhobi Matrimony Golden Annual (₹2,499)</option>
                <option value="Dhobi Silver Premium Half-Year">Silver Mid-Term Clearance (₹1,499)</option>
                <option value="Dhobi Lifetime Majestic Plan">Lifetime Supreme Clearance (₹9,999)</option>
              </select>
            </div>

            {/* Price paid */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#718096] uppercase">Amount (INR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl p-2.5 text-xs text-[#2d2d2d] outline-none mt-1 focus:bg-white focus:border-[#D4AF37]"
              />
            </div>

            {/* Method check */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#718096] uppercase">Gateway Channel</label>
              <input
                type="text"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl p-2.5 text-xs text-[#2d2d2d] outline-none mt-1 focus:bg-white focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-2 pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#800000] text-white hover:bg-[#6c0000] border border-[#D4AF37] rounded-xl py-2 px-6 text-xs font-semibold cursor-pointer transition flex items-center gap-1 shadow-sm"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Process Premium Clearance</span>
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Subscription payments ledger log table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
        <h4 className="font-serif font-bold text-lg text-[#800000] mb-4">Subscription Transaction Records</h4>
        <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#f5f6f8] text-[#2d2d2d] font-semibold border-b border-[#e2e8f0]">
                <th className="p-4">Transaction Code</th>
                <th className="p-4">Candidate User</th>
                <th className="p-4">Upgrade Tier</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Valid Range</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] text-[#2d2d2d]">
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#718096]">
                    No payment records indexed in historical ledger logs
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub, index) => {
                  const associatedUser = users.find(u => u.uid === sub.userId);
                  return (
                    <tr key={sub.subscriptionId || index} className="hover:bg-[#f5f6f8]/60 transition">
                      <td className="p-4 font-mono font-medium text-[#718096]">
                        {sub.subscriptionId}
                      </td>
                      <td className="p-4 font-medium text-[#2d2d2d]">
                        {associatedUser ? (
                          <div>
                            <p className="font-semibold">{associatedUser.name}</p>
                            <span className="text-[10px] text-[#718096] font-mono">{associatedUser.email}</span>
                          </div>
                        ) : (
                          <span className="text-[#718096] italic">UID: {sub.userId}</span>
                        )}
                      </td>
                      <td className="p-4 font-serif text-[#800000] font-bold">
                        {sub.planName}
                      </td>
                      <td className="p-4 font-mono font-bold text-[#2d2d2d]">
                        ₹{Number(sub.amount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-[11px] text-[#718096]">
                        {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : 'N/A'} - {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wide border ${
                          sub.status === 'active'
                            ? 'bg-emerald-50 text-emerald-750 border-emerald-250 border'
                            : 'bg-[#f5f6f8] text-[#718096] border-[#e2e8f0]'
                        }`}>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{sub.status}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

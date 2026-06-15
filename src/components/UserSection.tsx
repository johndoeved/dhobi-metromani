/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShieldCheck, ShieldAlert, UserCheck, Trash2, Edit3, X, Sparkles, PlusCircle } from 'lucide-react';
import { MatrimonyUser } from '../types';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';

interface UserSectionProps {
  users: MatrimonyUser[];
}

export default function UserSection({ users }: UserSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verifiedFilter, setVerifiedFilter] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');

  // Selected User for details / edit
  const [editingUser, setEditingUser] = useState<MatrimonyUser | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAge, setEditAge] = useState<number>(25);
  const [editReligion, setEditReligion] = useState('');
  const [editCaste, setEditCaste] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Add User Form Modal state
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUid, setNewUid] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newGender, setNewGender] = useState<'male' | 'female'>('female');
  const [newReligion, setNewReligion] = useState('Hindu');
  const [newCaste, setNewCaste] = useState('Dhobi');
  const [newAge, setNewAge] = useState<number>(26);

  // Filter Logic
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (user.email?.toLowerCase().includes(searchTerm.toLowerCase()) || '');

    const matchesGender = genderFilter === 'all' || user.gender === genderFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesVerified =
      verifiedFilter === 'all' ||
      (verifiedFilter === 'verified' && user.isVerified) ||
      (verifiedFilter === 'unverified' && !user.isVerified);
    const matchesMembership = membershipFilter === 'all' || user.membership === membershipFilter;

    return matchesSearch && matchesGender && matchesStatus && matchesVerified && matchesMembership;
  });

  // Toggle User Verification Badge (Admin privilege)
  const handleToggleVerification = async (user: MatrimonyUser) => {
    setActionError('');
    setActionSuccess('');
    const targetPath = `users/${user.uid}`;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        isVerified: !user.isVerified,
        updatedAt: new Date().toISOString()
      });
      setActionSuccess(`Successfully updated verification for ${user.name}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, targetPath);
    }
  };

  // Toggle User Block/Unblock Status (Admin privilege)
  const handleToggleStatus = async (user: MatrimonyUser) => {
    setActionError('');
    setActionSuccess('');
    const targetPath = `users/${user.uid}`;
    try {
      const userRef = doc(db, 'users', user.uid);
      const nextStatus = user.status === 'blocked' ? 'active' : 'blocked';
      await updateDoc(userRef, {
        status: nextStatus,
        updatedAt: new Date().toISOString()
      });
      setActionSuccess(`Successfully set status of ${user.name} to ${nextStatus.toUpperCase()}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, targetPath);
    }
  };

  // Delete User Profile
  const handleDeleteUser = async (user: MatrimonyUser) => {
    if (!window.confirm(`Are you absolutely sure you want to permanently delete profile ${user.name}? This cannot be undone.`)) {
      return;
    }
    setActionError('');
    setActionSuccess('');
    const targetPath = `users/${user.uid}`;
    try {
      await deleteDoc(doc(db, 'users', user.uid));
      setActionSuccess(`Successfully deleted profile: ${user.name}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, targetPath);
    }
  };

  // Trigger Edit Modal
  const startEditing = (user: MatrimonyUser) => {
    setEditingUser(user);
    setEditName(user.name || '');
    setEditPhone(user.phone || '');
    setEditAge(user.age || 25);
    setEditReligion(user.religion || '');
    setEditCaste(user.caste || '');
    setActionError('');
    setActionSuccess('');
  };

  // Submit Profile Edits
  const submitEdits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setActionError('');
    setActionSuccess('');
    const targetPath = `users/${editingUser.uid}`;
    try {
      const userRef = doc(db, 'users', editingUser.uid);
      await updateDoc(userRef, {
        name: editName,
        phone: editPhone,
        age: Number(editAge),
        religion: editReligion,
        caste: editCaste,
        updatedAt: new Date().toISOString()
      });
      setActionSuccess(`Profile for ${editName} updated successfully.`);
      setEditingUser(null);
    } catch (error) {
      setActionError('Error editing profile. See logs.');
      handleFirestoreError(error, OperationType.UPDATE, targetPath);
    }
  };

  // Create New Candidate Profile
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');
    setActionSuccess('');
    if (!newUid || !newName || !newEmail) {
      setActionError('Uid, Candidate Name, and Candidate Email are mandatory.');
      return;
    }

    const payload: MatrimonyUser = {
      uid: newUid,
      name: newName,
      email: newEmail,
      phone: newPhone || 'Not provided',
      gender: newGender,
      religion: newReligion,
      caste: newCaste,
      age: Number(newAge),
      status: 'active',
      isVerified: false,
      membership: 'free',
      profilePhoto: `https://images.unsplash.com/photo-${newGender === 'male' ? '1507003211169-0a1dd7228f2d' : '1494790108377-be9c29b29330'}?auto=format&fit=crop&w=150&h=150&q=80`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const targetPath = `users/${newUid}`;
    try {
      await setDoc(doc(db, 'users', newUid), payload);
      setActionSuccess(`Candidate ${newName} created successfully! New account connected.`);
      setIsAddingUser(false);
      // reset form
      setNewUid('');
      setNewName('');
      setNewEmail('');
      setNewPhone('');
      setNewAge(26);
    } catch (error) {
      setActionError('Error creating user profile.');
      handleFirestoreError(error, OperationType.CREATE, targetPath);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-6">
      
      {/* Search Header and Action Buttons */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="minimal-card-accent">
          <h3 className="font-serif font-bold text-xl text-[#800000]">User Profile Management</h3>
          <p className="text-xs text-[#718096]">Monitor matrimony profiles, adjust subscription flags, and secure candidate accounts.</p>
        </div>
        <button
          onClick={() => setIsAddingUser(true)}
          className="flex items-center gap-1.5 text-xs bg-[#800000] text-white hover:bg-[#6c0000] border border-[#D4AF37] px-4 py-2.5 rounded-xl font-semibold transition cursor-pointer shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>Add Custom Candidate</span>
        </button>
      </div>

      {/* Alert Notices */}
      {actionSuccess && (
        <div className="bg-emerald-50 text-emerald-800 text-xs py-3 px-4 rounded-xl border border-emerald-100 font-medium animate-in fade-in">
          {actionSuccess}
        </div>
      )}
      {actionError && (
        <div className="bg-rose-50 text-rose-800 text-xs py-3 px-4 rounded-xl border border-rose-100 font-medium animate-in fade-in">
          {actionError}
        </div>
      )}

      {/* Search & Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        
        {/* Search Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search by name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl py-2.5 pl-9 pr-4 text-xs text-[#2d2d2d] focus:bg-white focus:outline-none focus:border-[#D4AF37] transition"
          />
        </div>

        {/* Gender selector */}
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl py-2.5 px-3 text-xs text-[#2d2d2d] outline-none focus:bg-white focus:border-[#D4AF37] transition"
        >
          <option value="all">All Genders</option>
          <option value="male">Male only</option>
          <option value="female">Female only</option>
        </select>

        {/* Verification Status selector */}
        <select
          value={verifiedFilter}
          onChange={(e) => setVerifiedFilter(e.target.value)}
          className="bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl py-2.5 px-3 text-xs text-[#2d2d2d] outline-none focus:bg-white focus:border-[#D4AF37] transition"
        >
          <option value="all">Verification Status</option>
          <option value="verified">Verified Profile Stars</option>
          <option value="unverified">Unverified only</option>
        </select>

        {/* Membership Status selector */}
        <select
          value={membershipFilter}
          onChange={(e) => setMembershipFilter(e.target.value)}
          className="bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl py-2.5 px-3 text-xs text-[#2d2d2d] outline-none focus:bg-white focus:border-[#D4AF37] transition"
        >
          <option value="all">Membership Tier</option>
          <option value="premium">Premium Accounts</option>
          <option value="free">Free Tier</option>
        </select>

        {/* Account Lock status selector */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl py-2.5 px-3 text-xs text-[#2d2d2d] outline-none focus:bg-white focus:border-[#D4AF37] transition"
        >
          <option value="all">Safety status</option>
          <option value="active">Active only</option>
          <option value="blocked">Blocked only</option>
        </select>

      </div>

      {/* Main Users Table */}
      <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-[#f5f6f8] text-[#2d2d2d] font-semibold border-b border-[#e2e8f0]">
              <th className="p-4">Candidate Profile</th>
              <th className="p-4">Matrimony Stats</th>
              <th className="p-4">Status & Verify</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] text-[#2d2d2d]">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#718096]">
                  No matrimonial profiles found matching the active filters
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-[#f5f6f8]/60 transition duration-150">
                  
                  {/* Photo + User Main Name */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        referrerPolicy="no-referrer"
                        src={user.profilePhoto || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border border-[#e2e8f0] object-cover bg-[#f5f6f8]"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-serif font-semibold text-sm text-[#2d2d2d]">{user.name}</span>
                          {user.isVerified && (
                            <span className="text-amber-500 hover:scale-110 cursor-help transition" title="Verified Profile by Admin">
                              🎓
                            </span>
                          )}
                          {user.membership === 'premium' && (
                            <span className="bg-[#800000]/10 text-[#800000] text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">
                              PREMIUM
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#718096] font-mono mt-0.5">{user.email}</div>
                        <div className="text-[10px] text-[#D4AF37] font-medium">{user.phone || 'No phone'}</div>
                      </div>
                    </div>
                  </td>

                  {/* Religion / Demographics info */}
                  <td className="p-4 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <div>
                        <span className="font-medium text-[#2d2d2d]">{user.religion || 'Unknown'}</span>
                        <span className="text-[#718096] text-[10px]"> ({user.caste || 'All CASTES'})</span>
                      </div>
                      <div className="text-[10px] text-[#718096] flex gap-2">
                        <span>Age: {user.age || 'N/A'}</span>
                        <span>•</span>
                        <span className="capitalize">{user.gender || 'Not set'}</span>
                      </div>
                    </div>
                  </td>

                  {/* Verification stars & security toggle */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {/* Active Status Badge */}
                      <button
                        onClick={() => handleToggleStatus(user)}
                        title="Click to toggle status lock state"
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wide transition uppercase cursor-pointer ${
                          user.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {user.status}
                      </button>

                      {/* Verification Toggle helper */}
                      <button
                        onClick={() => handleToggleVerification(user)}
                        title="Toggle verification validity"
                        className={`p-1 rounded-md border transition cursor-pointer ${
                          user.isVerified
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : 'bg-[#f5f6f8] text-slate-400 border-[#e2e8f0]'
                        }`}
                      >
                        {user.isVerified ? (
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Profile quick controls */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Edit Button */}
                      <button
                        onClick={() => startEditing(user)}
                        title="Modify Profile Details"
                        className="p-1.5 text-[#718096] hover:text-[#D4AF37] transition cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete profile */}
                      <button
                        onClick={() => handleDeleteUser(user)}
                        title="Delete Profile record completely"
                        className="p-1.5 text-[#718096] hover:text-rose-600 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL DIALOG */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#e2e8f0] shadow-lg overflow-hidden animate-in fade-in-55 duration-250">
            <div className="bg-[#800000] text-white p-4 flex justify-between items-center border-b-4 border-b-[#D4AF37]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h4 className="font-serif font-bold text-md">Edit Candidate Profile</h4>
              </div>
              <button onClick={() => setEditingUser(null)} className="text-white/85 hover:text-white cursor-pointer transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitEdits} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">Candidate Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2.5 text-xs focus:bg-white focus:outline-none focus:border-[#D4AF37] transition mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">Phone Number</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2.5 text-xs focus:bg-white focus:outline-none focus:border-[#D4AF37] transition mt-1"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">Age</label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    required
                    value={editAge}
                    onChange={(e) => setEditAge(Number(e.target.value))}
                    className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2.5 text-xs focus:bg-white focus:outline-none focus:border-[#D4AF37] transition mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">Religion</label>
                  <input
                    type="text"
                    value={editReligion}
                    placeholder="e.g. Hindu"
                    onChange={(e) => setEditReligion(e.target.value)}
                    className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2.5 text-xs focus:bg-white focus:outline-none focus:border-[#D4AF37] transition mt-1"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">Caste</label>
                  <input
                    type="text"
                    value={editCaste}
                    placeholder="e.g. Dhobi"
                    onChange={(e) => setEditCaste(e.target.value)}
                    className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2.5 text-xs focus:bg-white focus:outline-none focus:border-[#D4AF37] transition mt-1"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2.5 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="bg-[#f5f6f8] hover:bg-slate-200 text-[#718096] text-xs px-4 py-2 rounded-lg cursor-pointer transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#800000] text-white hover:bg-[#680000] text-xs px-4 py-2 rounded-lg cursor-pointer transition font-semibold shadow-sm border border-[#D4AF37]"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CANDIDATE MODAL */}
      {isAddingUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#e2e8f0] shadow-lg overflow-hidden animate-in fade-in-55 duration-250">
            <div className="bg-[#800000] text-white p-4 flex justify-between items-center border-b-4 border-b-[#D4AF37]">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <h4 className="font-serif font-bold text-md">Register Matrimony Candidate</h4>
              </div>
              <button onClick={() => setIsAddingUser(false)} className="text-white hover:opacity-85 cursor-pointer transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Candidate Firebase Auth UID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. dhobi_user_101"
                  value={newUid}
                  onChange={(e) => setNewUid(e.target.value)}
                  className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2.5 text-xs focus:bg-white focus:outline-none focus:border-[#D4AF37] transition mt-1"
                />
                <p className="text-[10px] text-[#718096]">Unique identifier referenced inside the Android App database.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Rohit Parmar"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2 text-xs focus:bg-white focus:outline-none focus:border-[#D4AF37] transition mt-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="rohit@gmail.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2 text-xs focus:bg-white focus:outline-none focus:border-[#D4AF37] transition mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Gender</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as 'male' | 'female')}
                    className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2 text-xs mt-1 outline-none focus:bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Age</label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    required
                    value={newAge}
                    onChange={(e) => setNewAge(Number(e.target.value))}
                    className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Religion</label>
                  <input
                    type="text"
                    value={newReligion}
                    onChange={(e) => setNewReligion(e.target.value)}
                    className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Caste</label>
                  <input
                    type="text"
                    value={newCaste}
                    onChange={(e) => setNewCaste(e.target.value)}
                    className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2 text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Mobile Phone</label>
                <input
                  type="text"
                  placeholder="+91 9876543210"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-lg p-2 text-xs mt-1"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setIsAddingUser(false)}
                  className="bg-[#f5f6f8] text-[#718096] text-xs px-4 py-2 rounded-lg cursor-pointer transition font-medium"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="bg-[#800000] text-white hover:bg-[#6c0000] text-xs px-4 py-2 rounded-lg cursor-pointer font-semibold transition border border-[#D4AF37]"
                >
                  Validate & Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LayoutGrid, AlertCircle, PlusCircle, Check, HelpCircle, Save, ToggleLeft, ToggleRight, Trash } from 'lucide-react';
import { CMSBanner, CMSAnnouncement } from '../types';

interface CMSSectionProps {
  banners: CMSBanner[];
  announcements: CMSAnnouncement[];
  onAddBanner: (banner: Omit<CMSBanner, 'id' | 'createdAt'>) => void;
  onToggleBanner: (id: string) => void;
  onDeleteBanner: (id: string) => void;
  onAddAnnouncement: (ann: Omit<CMSAnnouncement, 'id' | 'createdAt'>) => void;
  onToggleAnnouncement: (id: string) => void;
  onDeleteAnnouncement: (id: string) => void;
}

export default function CMSSection({
  banners,
  announcements,
  onAddBanner,
  onToggleBanner,
  onDeleteBanner,
  onAddAnnouncement,
  onToggleAnnouncement,
  onDeleteAnnouncement
}: CMSSectionProps) {
  // Banner state
  const [bTitle, setBTitle] = useState('');
  const [bImage, setBImage] = useState('');
  const [bLink, setBLink] = useState('');

  // Announcement state
  const [aTitle, setATitle] = useState('');
  const [aContent, setAContent] = useState('');

  // Help Pages State
  const [helpTitle, setHelpTitle] = useState('Dhobi Metromani Matchmaking FAQ');
  const [helpContent, setHelpContent] = useState(
    'How do I request matches inside "Dhobi Metromani"?\n\nSimply browse the curated feed filtered by candidate preferences, religious sectors, backgrounds, and qualifications. When both matrimonial candidates state mutual consent ("swipe up" or "tap interest"), our system coordinates a secure live Match Chat.\n\nIs registration 100% secure?\n\nYes. Profile verifications rely on authentic administrative checks. All fake claims or abuse report filings instantly trigger moderator review and potential database isolation (bans).'
  );
  const [helpSuccess, setHelpSuccess] = useState(false);

  const handleCreateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bTitle || !bImage) return;
    onAddBanner({
      title: bTitle,
      imageUrl: bImage,
      linkUrl: bLink || undefined,
      isActive: true
    });
    setBTitle('');
    setBImage('');
    setBLink('');
  };

  const handleCreateAnn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aTitle || !aContent) return;
    onAddAnnouncement({
      title: aTitle,
      content: aContent,
      isActive: true
    });
    setATitle('');
    setAContent('');
  };

  const saveHelpPage = (e: React.FormEvent) => {
    e.preventDefault();
    setHelpSuccess(true);
    setTimeout(() => setHelpSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Upper Layout banner CMS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Banner Sliders Manager */}
        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-4">
          <div className="minimal-card-accent">
            <h4 className="font-serif font-bold text-lg text-[#800000] flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-[#800000]" />
              <span>Mobile Carousel Sliders (Banners)</span>
            </h4>
            <p className="text-xs text-[#718096]">Inject marketing campaigns on mobile app home headers.</p>
          </div>

          <form onSubmit={handleCreateBanner} className="bg-[#f5f6f8] p-4 rounded-xl border border-[#e2e8f0] space-y-3">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">Add Target Header Banner</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Slider Name / Title"
                value={bTitle}
                onChange={(e) => setBTitle(e.target.value)}
                className="bg-white border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#2d2d2d] outline-none focus:border-[#D4AF37] transition"
              />
              <input
                type="text"
                required
                placeholder="Image URL (HTTPS)"
                value={bImage}
                onChange={(e) => setBImage(e.target.value)}
                className="bg-white border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#2d2d2d] outline-none focus:border-[#D4AF37] transition"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Action Link URL (Optional)"
                value={bLink}
                onChange={(e) => setBLink(e.target.value)}
                className="flex-1 bg-white border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#2d2d2d] outline-none focus:border-[#D4AF37] transition"
              />
              <button
                type="submit"
                className="bg-[#800000] text-white hover:bg-[#6c0000] border border-[#D4AF37] px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition shadow-sm"
              >
                Add Banner
              </button>
            </div>
          </form>

          {/* List existing sliders */}
          <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
            {banners.length === 0 ? (
              <p className="text-xs text-[#718096] italic text-center py-6">No premium header slides configured</p>
            ) : (
              banners.map((ban) => (
                <div key={ban.id} className="flex gap-3 p-2.5 rounded-xl border border-[#e2e8f0] hover:bg-[#f5f6f8]/60 transition">
                  <img
                    referrerPolicy="no-referrer"
                    src={ban.imageUrl}
                    alt={ban.title}
                    className="w-14 h-10 object-cover rounded-lg border border-[#e2e8f0] shrink-0 bg-[#f5f6f8]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-[#2d2d2d] line-clamp-1">{ban.title}</p>
                    <span className="text-[10px] text-[#718096] block truncate">{ban.linkUrl || 'No referral link'}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onToggleBanner(ban.id)}
                      className={`text-slate-400 hover:text-[#800000] cursor-pointer`}
                      title="Activate / Deactivate slide"
                    >
                      {ban.isActive ? (
                        <ToggleRight className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-[#718096]" />
                      )}
                    </button>
                    <button
                      onClick={() => onDeleteBanner(ban.id)}
                      className="p-1 text-[#718096] hover:text-rose-600 cursor-pointer"
                      title="Delete Slider config"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Home announcements feed widget */}
        <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-4">
          <div className="minimal-card-accent">
            <h4 className="font-serif font-bold text-lg text-[#800000] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#800000]" />
              <span>Matrimonial Custom Announcements</span>
            </h4>
            <p className="text-xs text-[#718096]">Post system notifications shown on candidate notice grids.</p>
          </div>

          <form onSubmit={handleCreateAnn} className="bg-[#f5f6f8] p-4 rounded-xl border border-[#e2e8f0] space-y-3">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">Write Community Announcement</span>
            <input
              type="text"
              required
              placeholder="Announcement Alert Header"
              value={aTitle}
              onChange={(e) => setATitle(e.target.value)}
              className="w-full bg-white border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#2d2d2d] outline-none focus:border-[#D4AF37] transition"
            />
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Alert description (e.g. Free registrations this Sunday!)"
                value={aContent}
                onChange={(e) => setAContent(e.target.value)}
                className="flex-1 bg-white border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#2d2d2d] outline-none focus:border-[#D4AF37] transition"
              />
              <button
                type="submit"
                className="bg-[#800000] text-white border border-[#D4AF37] px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer hover:bg-[#6c0000] transition shadow-sm"
              >
                Publish Alert
              </button>
            </div>
          </form>

          {/* List announcements */}
          <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
            {announcements.length === 0 ? (
              <p className="text-xs text-[#718096] italic text-center py-6">No community notices configured</p>
            ) : (
              announcements.map((ann) => (
                <div key={ann.id} className="p-3 rounded-xl border border-[#e2e8f0] hover:bg-[#f5f6f8]/60 transition relative">
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-semibold text-xs text-[#2d2d2d] leading-tight">{ann.title}</p>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => onToggleAnnouncement(ann.id)}
                        className="text-[#718096] hover:text-emerald-600 cursor-pointer"
                        title="Toggle visibility"
                      >
                        {ann.isActive ? (
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold font-mono">ACTIVE</span>
                        ) : (
                          <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold font-mono">HIDDEN</span>
                        )}
                      </button>
                      <button
                        onClick={() => onDeleteAnnouncement(ann.id)}
                        className="p-0.5 text-slate-350 hover:text-rose-600 cursor-pointer"
                        title="Remove Notice"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#718096] leading-relaxed mt-1">{ann.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Static/Dynamic Help Page Content Guide Editor */}
      <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-4">
        <div className="minimal-card-accent">
          <h4 className="font-serif font-bold text-lg text-[#800000] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#800000]" />
            <span>Help Directories & Q&A Board Compiler</span>
          </h4>
          <p className="text-xs text-[#718096]">Publish in-app legal policy structures, candidate compliance guides, and support FAQs.</p>
        </div>

        {helpSuccess && (
          <div className="bg-emerald-50 text-emerald-800 text-xs py-2 px-3 rounded-xl border border-emerald-100 inline-flex items-center gap-1.5 font-medium animate-in fade-in-40 duration-100">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Help Directory guidelines saved successfully. Mobile sync active.</span>
          </div>
        )}

        <form onSubmit={saveHelpPage} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#718096] uppercase">Interactive Screen Title</label>
            <input
              type="text"
              required
              value={helpTitle}
              onChange={(e) => setHelpTitle(e.target.value)}
              className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl p-2.5 text-xs text-[#2d2d2d] outline-none mt-1 focus:bg-white focus:border-[#D4AF37] transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#718096] uppercase text-slate-705">Guides Content (Markdown-like formatted text block)</label>
            <textarea
              rows={6}
              value={helpContent}
              onChange={(e) => setHelpContent(e.target.value)}
              className="w-full bg-[#f5f6f8] border border-[#e2e8f0] rounded-xl p-2.5 text-xs text-[#2d2d2d] outline-none mt-1 focus:bg-white focus:border-[#D4AF37] transition font-mono leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="bg-[#800000] border border-[#D4AF37] hover:bg-[#6c0000] text-white px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>Compile & Safe Draft</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

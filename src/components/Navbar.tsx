import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Share2,
  Camera,
  Settings 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

interface NavbarProps {
  onOpenShareLink: () => void;
  onOpenChangePin: () => void;
  onOpenChangeLogo?: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenShareLink, onOpenChangeLogo, onOpenSettings }) => {
  const { isOwner, isViewer, lockApp, openPinModal } = useAuth();
  const { settings } = useData();

  const isExplicitViewer = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('role') === 'viewer';

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            {/* Logo container: If Owner, clicking changes logo; if dev/owner without ?role=viewer, clicking unlocks PIN */}
            {isOwner && onOpenChangeLogo ? (
              <button
                type="button"
                onClick={onOpenChangeLogo}
                title="Coaching Logo / Photo Badlein (Click to Change)"
                className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black overflow-hidden group border border-amber-400/40 hover:scale-105 transition"
              >
                {settings.logoImageUrl ? (
                  <img
                    src={settings.logoImageUrl}
                    alt={settings.coachingName}
                    className="w-full h-full max-w-full max-h-full object-cover block"
                  />
                ) : (
                  <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6" />
                )}
                {/* Camera edit overlay badge for Owner */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white">
                  <Camera className="w-3.5 h-3.5 text-amber-300" />
                </div>
              </button>
            ) : !isExplicitViewer ? (
              /* When not on public viewer link, clicking logo prompts Akash Sir for his PIN */
              <button
                type="button"
                onClick={() => openPinModal('owner')}
                title="Director Login (Click to Enter PIN)"
                className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black overflow-hidden border border-amber-400/30 hover:ring-2 hover:ring-amber-400 transition"
              >
                {settings.logoImageUrl ? (
                  <img
                    src={settings.logoImageUrl}
                    alt={settings.coachingName}
                    className="w-full h-full max-w-full max-h-full object-cover block"
                  />
                ) : (
                  <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6" />
                )}
              </button>
            ) : (
              /* For Parents on ?role=viewer: Completely static clean logo */
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black overflow-hidden border border-amber-400/30">
                {settings.logoImageUrl ? (
                  <img
                    src={settings.logoImageUrl}
                    alt={settings.coachingName}
                    className="w-full h-full max-w-full max-h-full object-cover block"
                  />
                ) : (
                  <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6" />
                )}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-black text-sm sm:text-lg tracking-tight text-white font-['Outfit'] truncate block">
                  {settings.coachingName || 'Parag Coaching'}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                  By {settings.ownerName || 'Akash Pandey'}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 font-medium truncate">
                <ShieldCheck className="w-3 h-3 text-emerald-400 inline shrink-0" />
                <span className="truncate">{isViewer ? 'Student & Parent Portal (100% Read-Only)' : 'Edit Mode Active'}</span>
              </p>
            </div>
          </div>

          {/* Right Controls: Settings button is visible to both Owner and Parent/Viewer */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 shrink-0">
            {/* ⚙️ Settings Button */}
            <button
              onClick={onOpenSettings}
              type="button"
              title="Settings (Backup, Restore, App Info)"
              className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 py-1.5 sm:px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition shadow-sm"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Settings</span>
            </button>

            {/* ONLY for Owner / Client when unlocked (100% hidden for Viewer) */}
            {!isViewer && (
              <>
                {/* Share Link Button */}
                <button
                  onClick={onOpenShareLink}
                  title="Share links"
                  className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 py-1.5 sm:px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Share Link</span>
                  <span className="sm:hidden">Share</span>
                </button>

                {/* Owner / Client Badge & Lock Button */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black">
                    👑 {isOwner ? 'Owner' : 'Faculty'}
                  </span>

                  <button
                    onClick={lockApp}
                    title="Lock back to Viewer mode"
                    className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 py-1.5 sm:px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow"
                  >
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Lock to Viewer</span>
                    <span className="sm:hidden">Lock</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

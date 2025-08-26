import React from 'react';
import { SettingsIcon, LogoutIcon } from '../constants';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSettingsClick }) => {
  const { logout, user } = useAuth();
  
  return (
    <header className="bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 flex-shrink-0">
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center">
            {/* Hamburger Menu (Mobile only) */}
            <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-accent md:hidden"
            aria-label="Open menu"
            >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </button>
        </div>
        
        <div className="flex items-center gap-2">
            {/* Settings Button */}
            <button
            onClick={onSettingsClick}
            className="p-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Open settings"
            >
            <SettingsIcon className="w-6 h-6" />
            </button>

             {/* Logout Button */}
            <button
            onClick={logout}
            className="p-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Logout"
            >
            <LogoutIcon className="w-6 h-6" />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
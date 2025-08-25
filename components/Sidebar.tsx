import React, { useContext } from 'react';
import { SectionId } from '../types';
import { SECTIONS } from '../constants';
import { SettingsContext } from '../contexts/SettingsContext';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeSection: SectionId;
  setActiveSection: (sectionId: SectionId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeSection, setActiveSection }) => {
  const { settings } = useContext(SettingsContext);

  const NavLink: React.FC<{ section: typeof SECTIONS[0] }> = ({ section }) => {
    const isActive = activeSection === section.id;
    return (
      <a
        href={`#${section.id}`}
        onClick={(e) => {
          e.preventDefault();
          setActiveSection(section.id);
        }}
        className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-red-100 text-accent dark:bg-red-900/50 dark:text-white'
            : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
        }`}
      >
        <span className="mr-3">{section.icon}</span>
        {section.title}
      </a>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-slate-100 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-4 z-40 transform transition-transform md:relative md:translate-x-0 md:h-auto md:bg-transparent md:dark:bg-transparent md:border-r-0 md:dark:border-r-0 md:w-64 flex-shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center mb-8 h-8">
          <div className="p-2 bg-accent rounded-lg">
             <Logo type={settings.logo} className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold ml-3 text-slate-800 dark:text-white truncate">{settings.appName}</h1>
        </div>
        
        <nav className="space-y-2">
          {SECTIONS.map((section) => (
            <NavLink key={section.id} section={section} />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
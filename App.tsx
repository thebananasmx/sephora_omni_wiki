import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import { SectionId } from './types';
import Introduction from './wiki/Introduction';
import Colors from './wiki/Colors';
import Typography from './wiki/Typography';
import Components from './wiki/Components';
import Layout from './wiki/Layout';
import Icons from './wiki/Icons';
import Settings from './wiki/Settings';
import { useAuth } from './contexts/AuthContext';
import { Logo } from './components/Logo';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.INTRODUCTION);
  const { user, loading } = useAuth();

  const handleSectionChange = useCallback((sectionId: SectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case SectionId.INTRODUCTION:
        return <Introduction />;
      case SectionId.COLORS:
        return <Colors />;
      case SectionId.TYPOGRAPHY:
        return <Typography />;
      case SectionId.COMPONENTS:
        return <Components />;
      case SectionId.LAYOUT:
        return <Layout />;
      case SectionId.ICONS:
        return <Icons />;
      case SectionId.SETTINGS:
        return <Settings />;
      default:
        return <Introduction />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
        <div className="p-4 bg-accent rounded-lg animate-pulse">
            <Logo type="default" className="w-8 h-8 text-white" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          onSettingsClick={() => handleSectionChange(SectionId.SETTINGS)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-6 py-8 md:px-10 md:py-12">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { SectionId } from './types';
import Introduction from './wiki/Introduction';
import Colors from './wiki/Colors';
import Typography from './wiki/Typography';
import Components from './wiki/Components';
import Layout from './wiki/Layout';
import Icons from './wiki/Icons';
import Settings from './wiki/Settings';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.INTRODUCTION);

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
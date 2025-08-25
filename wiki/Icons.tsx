
import React from 'react';
import { HomeIcon, PaletteIcon, TypographyIcon, ComponentIcon, LayoutIcon, SparklesIcon } from '../constants';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({ title, subtitle }) => (
    <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">{title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>
    </div>
);

const IconDisplay: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => (
    <div className="flex flex-col items-center justify-center p-6 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800/50">
        <div className="w-10 h-10 text-slate-700 dark:text-slate-300">
            {children}
        </div>
        <p className="mt-4 text-sm font-mono text-slate-500 dark:text-slate-400">{name}</p>
    </div>
);

const Icons: React.FC = () => {
  return (
    <div className="max-w-4xl">
      <PageHeader 
        title="Icons"
        subtitle="A curated set of icons for clear communication and intuitive navigation."
      />
      
      <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <p>Our icon library is designed to be simple, consistent, and recognizable. Use icons to supplement text and enhance usability, but avoid relying on them as the sole means of communication.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <IconDisplay name="HomeIcon">
              <HomeIcon className="w-full h-full" />
          </IconDisplay>
          <IconDisplay name="PaletteIcon">
              <PaletteIcon className="w-full h-full" />
          </IconDisplay>
          <IconDisplay name="TypographyIcon">
              <TypographyIcon className="w-full h-full" />
          </IconDisplay>
          <IconDisplay name="ComponentIcon">
              <ComponentIcon className="w-full h-full" />
          </IconDisplay>
          <IconDisplay name="LayoutIcon">
              <LayoutIcon className="w-full h-full" />
          </IconDisplay>
          <IconDisplay name="SparklesIcon">
              <SparklesIcon className="w-full h-full" />
          </IconDisplay>
      </div>

    </div>
  );
};

export default Icons;

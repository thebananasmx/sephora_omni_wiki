
import React from 'react';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({ title, subtitle }) => (
    <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">{title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>
    </div>
);

const SectionHeader: React.FC<{title: string; children?: React.ReactNode}> = ({ title, children }) => (
    <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        {children && <p className="mt-1 text-slate-600 dark:text-slate-400">{children}</p>}
    </div>
);

const ColorSwatch: React.FC<{ name: string; hex: string; className: string }> = ({ name, hex, className }) => (
    <div className="flex items-center space-x-4">
        <div className={`w-16 h-16 rounded-lg shadow-inner border border-black/10 ${className}`}></div>
        <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{name}</p>
            <p className="font-mono text-sm text-slate-500 dark:text-slate-400">{hex}</p>
        </div>
    </div>
);

const Colors: React.FC = () => {
    const core = [
        { name: 'Black', hex: '#000000', className: 'bg-black' },
        { name: 'White', hex: '#FFFFFF', className: 'bg-white' },
        { name: 'Accent Red', hex: '#C92D3B', className: 'bg-accent' },
    ];
    const neutral = [
        { name: 'Slate 50', hex: '#f8fafc', className: 'bg-slate-50' },
        { name: 'Slate 200', hex: '#e2e8f0', className: 'bg-slate-200' },
        { name: 'Slate 500', hex: '#64748b', className: 'bg-slate-500' },
        { name: 'Slate 800', hex: '#1e293b', className: 'bg-slate-800' },
        { name: 'Slate 900', hex: '#0f172a', className: 'bg-slate-900' },
        { name: 'Slate 950', hex: '#020617', className: 'bg-slate-950' },
    ];
    const semantic = [
        { name: 'Green 500', hex: '#22c55e', className: 'bg-green-500' },
        { name: 'Amber 500', hex: '#f59e0b', className: 'bg-amber-500' },
        { name: 'Red 500', hex: '#ef4444', className: 'bg-red-500' },
    ];

  return (
    <div className="max-w-4xl">
      <PageHeader 
        title="Colors"
        subtitle="Our color palette is designed for clarity, harmony, and accessibility."
      />

      <SectionHeader title="Core Palette">
        The core colors define our brand. Black and white provide a high-contrast foundation, while the accent red is used for key actions and highlights.
      </SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {core.map(color => <ColorSwatch key={color.name} {...color} />)}
      </div>

      <SectionHeader title="Neutral Palette">
        Neutrals form the foundation of our UI, used for text, backgrounds, and borders.
      </SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {neutral.map(color => <ColorSwatch key={color.name} {...color} />)}
      </div>

      <SectionHeader title="Semantic Colors">
        These colors convey specific meanings, such as success, warning, or danger. Use them purposefully and consistently.
      </SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {semantic.map(color => <ColorSwatch key={color.name} {...color} />)}
      </div>

    </div>
  );
};

export default Colors;
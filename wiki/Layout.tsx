
import React from 'react';
import CodeBlock from '../components/CodeBlock';

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

const SpacingBlock: React.FC<{ size: string, value: string, className: string}> = ({ size, value, className }) => (
    <div className="flex items-center space-x-4">
        <div className="w-16 flex-shrink-0">
            <div className={`${className} bg-red-200 dark:bg-red-900/50`}></div>
        </div>
        <div>
            <p className="font-mono text-sm text-slate-800 dark:text-slate-200">{size}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{value}</p>
        </div>
    </div>
);

const Layout: React.FC = () => {
    const spacingScale = [
        { size: 'p-1', value: '4px', className: 'h-1' },
        { size: 'p-2', value: '8px', className: 'h-2' },
        { size: 'p-4', value: '16px', className: 'h-4' },
        { size: 'p-6', value: '24px', className: 'h-6' },
        { size: 'p-8', value: '32px', className: 'h-8' },
        { size: 'p-12', value: '48px', className: 'h-12' },
    ];
  return (
    <div className="max-w-4xl">
      <PageHeader 
        title="Layout & Spacing"
        subtitle="Our layout system provides a consistent structure and rhythm for arranging content."
      />
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>We use a consistent spacing scale based on a 4px grid. This ensures that all elements align harmoniously, creating a visually balanced and predictable interface. Use Tailwind's spacing utilities for margins, padding, and gaps.</p>
      </div>

      <SectionHeader title="Spacing Scale">
        Use these utilities to apply consistent padding, margin, and gaps between elements.
      </SectionHeader>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {spacingScale.map(item => <SpacingBlock key={item.size} {...item} />)}
      </div>

      <SectionHeader title="Grid System">
        For complex layouts, use CSS Grid or Flexbox. Tailwind provides powerful utilities for both.
      </SectionHeader>

      <p className="text-slate-600 dark:text-slate-400">Here is a common 3-column layout example:</p>

      <div className="mt-4 p-8 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-200 dark:bg-slate-700 rounded-md text-center">Column 1</div>
            <div className="p-4 bg-slate-200 dark:bg-slate-700 rounded-md text-center">Column 2</div>
            <div className="p-4 bg-slate-200 dark:bg-slate-700 rounded-md text-center">Column 3</div>
        </div>
      </div>
      <CodeBlock code={`
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
`} />
    </div>
  );
};

export default Layout;
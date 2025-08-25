
import React from 'react';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({ title, subtitle }) => (
    <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">{title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>
    </div>
);

const Introduction: React.FC = () => {
  return (
    <div className="max-w-4xl">
      <PageHeader 
        title="Design System Wiki"
        subtitle="Welcome to our guide for building consistent, high-quality user experiences."
      />
      
      <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-accent dark:prose-a:text-red-400 prose-strong:text-slate-800 dark:prose-strong:text-slate-200">
        <p>
          This design system is the single source of truth for our product's UI. It contains the principles, guidelines, and reusable components needed to build applications that are intuitive, accessible, and visually cohesive.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">Our Core Principles</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Clarity over Clutter</h3>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Prioritize clear communication and intuitive interfaces. Every element should have a purpose and be easy to understand.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Consistency is Key</h3>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              A consistent experience builds trust and makes our product easier to learn and use. Use established patterns and components.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Accessible by Default</h3>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              We design for everyone. Our products must be usable by people with diverse abilities and needs.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Efficient & Performant</h3>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Our interfaces should be fast and responsive, respecting our users' time and resources.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">How to Use This Wiki</h2>
        <p>
          Use the navigation on the left to explore different aspects of the design system. Each section provides detailed guidelines, best practices, and code examples. If you have questions or suggestions, please reach out to the design systems team.
        </p>
      </div>
    </div>
  );
};

export default Introduction;

import React from 'react';
import CodeBlock from '../components/CodeBlock';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({ title, subtitle }) => (
    <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">{title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>
    </div>
);

const TypeSample: React.FC<{ title: string; className: string; children: React.ReactNode }> = ({ title, className, children }) => (
    <div className="mt-8">
        <div className="flex justify-between items-baseline">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
            <p className="font-mono text-sm text-slate-500 dark:text-slate-400">{className}</p>
        </div>
        <div className="p-6 mt-2 border border-slate-200 dark:border-slate-800 rounded-lg">
            {children}
        </div>
    </div>
);

const Typography: React.FC = () => {
  return (
    <div className="max-w-4xl">
      <PageHeader 
        title="Typography"
        subtitle="Consistent typography creates a clear visual hierarchy and improves readability."
      />

        <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>Our typographic scale is based on the <code className="font-mono text-sm">Helvetica</code> font family. It is designed to be flexible and maintain a clear hierarchy across all screen sizes.</p>
        </div>

        <TypeSample title="Display" className="text-5xl font-extrabold">
            <h1 className="text-5xl font-extrabold">The quick brown fox jumps over the lazy dog.</h1>
        </TypeSample>
        <CodeBlock code={`<h1 class="text-5xl font-extrabold">...</h1>`} />
        
        <TypeSample title="Heading 1" className="text-4xl font-bold">
            <h1 className="text-4xl font-bold">The quick brown fox jumps over the lazy dog.</h1>
        </TypeSample>
        <CodeBlock code={`<h1 class="text-4xl font-bold">...</h1>`} />
        
        <TypeSample title="Heading 2" className="text-2xl font-bold">
            <h2 className="text-2xl font-bold">The quick brown fox jumps over the lazy dog.</h2>
        </TypeSample>
        <CodeBlock code={`<h2 class="text-2xl font-bold">...</h2>`} />

        <TypeSample title="Heading 3" className="text-xl font-semibold">
            <h3 className="text-xl font-semibold">The quick brown fox jumps over the lazy dog.</h3>
        </TypeSample>
        <CodeBlock code={`<h3 class="text-xl font-semibold">...</h3>`} />
        
        <TypeSample title="Body Text" className="text-base">
            <p className="text-base">
                The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </TypeSample>
        <CodeBlock code={`<p class="text-base">...</p>`} />
        
        <TypeSample title="Subtle Text" className="text-sm text-slate-600 dark:text-slate-400">
            <p className="text-sm text-slate-600 dark:text-slate-400">
                The quick brown fox jumps over the lazy dog.
            </p>
        </TypeSample>
        <CodeBlock code={`<p class="text-sm text-slate-600 dark:text-slate-400">...</p>`} />

    </div>
  );
};

export default Typography;
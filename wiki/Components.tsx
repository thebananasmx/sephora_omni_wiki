import React, { useContext } from 'react';
import CodeBlock from '../components/CodeBlock';
import { SettingsContext } from '../contexts/SettingsContext';

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

const ComponentShowcase: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-8 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800/50">
        <div className="flex flex-wrap items-center gap-4">
            {children}
        </div>
    </div>
);

const Components: React.FC = () => {
  const { settings } = useContext(SettingsContext);

  const primaryButtonBase = `px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent`;
  const primaryButtonFilled = `text-white bg-accent shadow-sm hover:opacity-90`;
  const primaryButtonOutline = `text-accent border border-accent hover:bg-accent/10`;
  const primaryButtonStyle = settings.primaryButtonStyle === 'filled' ? primaryButtonFilled : primaryButtonOutline;
  
  return (
    <div className="max-w-4xl">
      <PageHeader 
        title="Components"
        subtitle="A collection of reusable, accessible, and consistent UI components."
      />

      <SectionHeader title="Buttons">
        Buttons are used for actions. The style of a button should indicate its importance and role in the interface.
      </SectionHeader>
      
      <ComponentShowcase>
        <button className={`${primaryButtonBase} ${primaryButtonStyle} ${settings.buttonRadius}`}>Primary Action</button>
        <button className={`px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 ${settings.buttonRadius}`}>Secondary</button>
        <button className={`px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900 ${settings.buttonRadius}`}>Destructive</button>
      </ComponentShowcase>
      <CodeBlock code={`
<button class="${primaryButtonBase} ${primaryButtonStyle} ${settings.buttonRadius}">Primary Action</button>
<button class="px-4 py-2 ... bg-slate-200 ${settings.buttonRadius}">Secondary</button>
<button class="px-4 py-2 ... bg-red-100 ${settings.buttonRadius}">Destructive</button>
`} />

      <SectionHeader title="Inputs">
        Form inputs are used to collect data from the user. They should be clearly labeled and provide feedback on their state.
      </SectionHeader>

      <ComponentShowcase>
        <div className="w-full max-w-xs">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
          <div className="mt-1">
            <input 
              type="email" 
              name="email" 
              id="email" 
              className={`block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-sm placeholder-slate-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm ${settings.buttonRadius}`} 
              placeholder="you@example.com" 
            />
          </div>
        </div>
      </ComponentShowcase>
      <CodeBlock code={`
<div>
  <label htmlFor="email" class="block text-sm font-medium text-slate-700">Email</label>
  <input 
    type="email" 
    name="email" 
    id="email" 
    class="block w-full border-slate-300 shadow-sm focus:ring-accent focus:border-accent ${settings.buttonRadius} ..." 
    placeholder="you@example.com" 
  />
</div>
`} />

      <SectionHeader title="Cards">
        Cards are used to group related content and actions into a single, digestible container.
      </SectionHeader>

      <ComponentShowcase>
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden rounded-lg">
            <img className="w-full h-40 object-cover" src="https://picsum.photos/400/200" alt="Card image" />
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Card Title</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    This is a brief description of the card's content. It provides context and entices the user to learn more.
                </p>
                <button className={`${primaryButtonBase} ${primaryButtonStyle} ${settings.buttonRadius}`}>Read More</button>
            </div>
        </div>
      </ComponentShowcase>
      <CodeBlock code={`
<div class="bg-white rounded-lg shadow-lg border overflow-hidden">
    <img src="..." alt="..." />
    <div class="p-6">
        <h3 class="text-xl font-bold ...">Card Title</h3>
        <p class="text-slate-600 mb-4 ...">...</p>
        <button class="...">Read More</button>
    </div>
</div>
`} />
    </div>
  );
};

export default Components;
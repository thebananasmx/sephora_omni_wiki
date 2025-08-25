import React, { useContext, useCallback, useState, useEffect } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import { Settings, LogoType, ButtonRadiusType, PrimaryButtonStyleType } from '../types';
import { LogoCube, LogoPlus, LogoSwatch, LogoDefault } from '../components/Logo';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({ title, subtitle }) => (
    <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">{title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>
    </div>
);

const SectionHeader: React.FC<{title: string; children?: React.ReactNode}> = ({ title, children }) => (
    <div className="mt-12 mb-6 border-t border-slate-200 dark:border-slate-800 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        {children && <p className="mt-1 text-slate-600 dark:text-slate-400">{children}</p>}
    </div>
);

const logos: { id: LogoType, icon: React.FC<any> }[] = [
    { id: 'default', icon: LogoDefault },
    { id: 'plus', icon: LogoPlus },
    { id: 'swatch', icon: LogoSwatch },
    { id: 'cube', icon: LogoCube },
];

const colors = ['#C92D3B', '#4f46e5', '#0891b2', '#059669', '#ca8a04', '#d97706'];

const buttonRadii: { id: ButtonRadiusType, label: string }[] = [
    { id: 'rounded-none', label: 'None' },
    { id: 'rounded', label: 'Small' },
    { id: 'rounded-md', label: 'Medium' },
    { id: 'rounded-lg', label: 'Large' },
    { id: 'rounded-full', label: 'Full' },
];

const primaryButtonStyles: { id: PrimaryButtonStyleType, label: string }[] = [
    { id: 'filled', label: 'Filled' },
    { id: 'outline', label: 'Outline' },
];

const Settings: React.FC = () => {
    const { settings, updateSettings } = useContext(SettingsContext);
    const [localSettings, setLocalSettings] = useState<Settings>(settings);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    useEffect(() => {
        setHasChanges(JSON.stringify(localSettings) !== JSON.stringify(settings));
    }, [localSettings, settings]);

    const handleUpdate = useCallback((key: keyof Settings, value: any) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleSave = () => {
        updateSettings(localSettings);
    };

    const handleCancel = () => {
        setLocalSettings(settings);
    };

    return (
    <div className="max-w-4xl pb-24">
        <PageHeader 
            title="Settings"
            subtitle="Customize the appearance of your design system wiki."
        />

        {/* --- General --- */}
        <SectionHeader title="General">
            Customize the brand identity of the wiki.
        </SectionHeader>
        <div className="space-y-6">
            <div>
                <label htmlFor="appName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">App Name</label>
                <input 
                    type="text" 
                    id="appName" 
                    value={localSettings.appName}
                    onChange={(e) => handleUpdate('appName', e.target.value)}
                    className="mt-1 block w-full max-w-sm px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                />
            </div>
            <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Logo</label>
                 <div className="flex items-center gap-2">
                    {logos.map(({ id, icon: Icon }) => (
                         <button
                            key={id}
                            onClick={() => handleUpdate('logo', id)}
                            className={`p-3 border-2 rounded-lg ${localSettings.logo === id ? 'border-accent' : 'border-slate-300 dark:border-slate-700'}`}
                            aria-label={`Select ${id} logo`}
                         >
                             <Icon className="w-6 h-6 text-slate-600 dark:text-slate-300"/>
                         </button>
                    ))}
                 </div>
            </div>
        </div>

        {/* --- Appearance --- */}
        <SectionHeader title="Appearance">
            Change colors and component styles to match your brand.
        </SectionHeader>
        <div className="space-y-8">
            <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Accent Color</label>
                <div className="mt-2 flex items-center gap-3">
                     <input 
                        type="color" 
                        id="primaryColor" 
                        value={localSettings.primaryColor}
                        onChange={(e) => handleUpdate('primaryColor', e.target.value)}
                        className="p-1 h-10 w-10 block bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 cursor-pointer rounded-md"
                    />
                    <div className="flex items-center gap-2">
                        {colors.map(color => (
                            <button
                                key={color}
                                onClick={() => handleUpdate('primaryColor', color)}
                                className={`h-8 w-8 rounded-full border-2 ${localSettings.primaryColor === color ? 'border-slate-800 dark:border-white' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Button Border Radius</label>
                 <div className="flex flex-wrap items-center gap-2">
                    {buttonRadii.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => handleUpdate('buttonRadius', id)}
                            className={`px-4 py-2 text-sm font-semibold border rounded-md ${localSettings.buttonRadius === id ? 'bg-accent text-white border-accent' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700'}`}
                        >
                            {label}
                        </button>
                    ))}
                 </div>
            </div>

             <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Primary Button Style</label>
                 <div className="flex items-center gap-2">
                    {primaryButtonStyles.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => handleUpdate('primaryButtonStyle', id)}
                             className={`px-4 py-2 text-sm font-semibold border rounded-md ${localSettings.primaryButtonStyle === id ? 'bg-accent text-white border-accent' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700'}`}
                        >
                            {label}
                        </button>
                    ))}
                 </div>
            </div>
        </div>
        
        {/* --- Action Buttons --- */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm z-20">
            <div className="max-w-4xl mx-auto flex justify-end gap-4 px-6 md:px-10 py-4 border-t border-slate-200 dark:border-slate-800">
                <button
                    onClick={handleCancel}
                    disabled={!hasChanges}
                    className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:border-slate-700"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSave}
                    disabled={!hasChanges}
                    className="px-5 py-2 text-sm font-semibold text-white bg-accent shadow-sm hover:opacity-90 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Aceptar
                </button>
            </div>
        </div>
    </div>
  );
};

export default Settings;
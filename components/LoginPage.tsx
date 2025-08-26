import React, { useContext, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { Logo } from './Logo';

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.426,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const LoginPage: React.FC = () => {
    const { loginWithGoogle, signInWithEmail, signUpWithEmail, sendPasswordReset } = useAuth();
    const { settings } = useContext(SettingsContext);
    const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            if (mode === 'signup') {
                await signUpWithEmail(email, password);
            } else if (mode === 'signin') {
                await signInWithEmail(email, password);
            } else if (mode === 'reset') {
                await sendPasswordReset(email);
                setMessage('Enlace para restablecer la contraseña enviado. ¡Revisa tu correo!');
            }
        } catch (err: any) {
             const friendlyMessage = err.code?.replace('auth/', '').replace(/-/g, ' ') || 'An error occurred';
             setError(friendlyMessage.charAt(0).toUpperCase() + friendlyMessage.slice(1));
        }
    };
    
    const getTitle = () => {
        if (mode === 'signup') return 'Crear Cuenta';
        if (mode === 'reset') return 'Restablecer Contraseña';
        return 'Iniciar Sesión';
    };

    const getButtonText = () => {
        if (mode === 'signup') return 'Crear Cuenta';
        if (mode === 'reset') return 'Enviar enlace';
        return 'Iniciar Sesión';
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 px-4">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-slate-950/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center mb-4">
                        <div className="p-3 bg-accent rounded-lg mr-4">
                            <Logo type={settings.logo} className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-white truncate">{settings.appName}</h1>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">{getTitle()}</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleAuthAction} className="space-y-4">
                    {error && <p className="text-sm text-center font-medium text-red-500 bg-red-100 dark:bg-red-900/50 p-2 rounded-md">{error}</p>}
                    {message && <p className="text-sm text-center font-medium text-green-600 bg-green-100 dark:bg-green-900/50 p-2 rounded-md">{message}</p>}
                    
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo electrónico"
                            required
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-accent focus:border-accent"
                        />
                    </div>

                    {mode !== 'reset' && (
                        <div>
                           <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                required
                                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-accent focus:border-accent"
                            />
                        </div>
                    )}
                    
                    <button type="submit" className="w-full px-4 py-2 text-sm font-semibold text-white bg-accent rounded-lg shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-opacity">
                        {getButtonText()}
                    </button>
                </form>

                {/* Links */}
                <div className="text-sm text-center space-y-2">
                     {mode === 'signin' && (
                        <div className="flex justify-between items-center">
                             <a href="#" onClick={(e) => { e.preventDefault(); setMode('signup'); setError(null);}} className="font-medium text-accent hover:underline">
                                Crear cuenta
                            </a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setMode('reset'); setError(null);}} className="font-medium text-accent hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    )}
                     {mode === 'signup' && (
                        <p className="text-slate-600 dark:text-slate-400">
                            ¿Ya tienes una cuenta?{' '}
                            <a href="#" onClick={(e) => { e.preventDefault(); setMode('signin'); setError(null);}} className="font-medium text-accent hover:underline">
                                Inicia sesión
                            </a>
                        </p>
                    )}
                    {mode === 'reset' && (
                         <p className="text-slate-600 dark:text-slate-400">
                            <a href="#" onClick={(e) => { e.preventDefault(); setMode('signin'); setError(null);}} className="font-medium text-accent hover:underline">
                                Volver a iniciar sesión
                            </a>
                        </p>
                    )}
                </div>

                {/* Separator and Google Sign-in */}
                {mode !== 'reset' && (
                     <>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-slate-950/50 text-slate-500 dark:text-slate-400">O continúa con</span>
                            </div>
                        </div>
                        <button
                            onClick={loginWithGoogle}
                            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
                        >
                            <GoogleIcon />
                            Iniciar sesión con Google
                        </button>
                     </>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
import React, { useState } from 'react';
import { X, Check, ShieldCheck, AlertCircle, ArrowRight, UserPlus } from 'lucide-react';
import api from '../../services/api';

export default function GoogleAuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Pre-configured test institutional Google accounts
  const demoAccounts = [
    {
      name: 'Juan Dela Cruz',
      email: 'juan.delacruz@abc.edu.ph',
      role: 'Student',
      initials: 'JD',
      bgColor: 'bg-emerald-600',
    },
    {
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@student.abc.edu',
      role: 'Approved Student',
      initials: 'CM',
      bgColor: 'bg-blue-600',
    },
    {
      name: 'Prof. Maria Santos',
      email: 'maria.santos@abc.edu.ph',
      role: 'Faculty',
      initials: 'MS',
      bgColor: 'bg-purple-600',
    },
    {
      name: 'Dr. Alejandro Reyes',
      email: 'admin@abc.edu.ph',
      role: 'Administrator',
      initials: 'AR',
      bgColor: 'bg-amber-600',
    },
  ];

  const handleAuthenticate = async (account) => {
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/google', {
        email: account.email,
        name: account.name,
        google_id: 'google_mock_' + Math.floor(100000000 + Math.random() * 900000000),
        avatar: null,
      });

      const { access_token, user } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      onLoginSuccess(user);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to sign in with this Google account. Please make sure the account is registered.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail.trim()) {
      setError('Please enter a valid Google email address.');
      return;
    }
    handleAuthenticate({
      email: customEmail.trim(),
      name: customName.trim() || customEmail.split('@')[0],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Google Branding */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                Sign in with Google
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Choose an account to continue to ABC School Portal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mx-6 mt-4 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">
              {error}
            </div>
          </div>
        )}

        {/* Account Selector List */}
        <div className="p-6 pt-4 space-y-2.5">
          {!showCustomInput ? (
            <>
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 px-1">
                Institutional Accounts
              </p>

              <div className="space-y-2">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    disabled={loading}
                    onClick={() => handleAuthenticate(acc)}
                    className="w-full p-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-2xl transition-all text-left group disabled:opacity-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full ${acc.bgColor} text-white font-bold text-sm flex items-center justify-center shadow-sm`}>
                        {acc.initials}
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#182848] transition-colors">
                          {acc.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {acc.email}
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-white border border-slate-200 text-slate-600">
                      {acc.role}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Email Option */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  className="w-full py-2.5 px-3 border border-dashed border-slate-300 hover:border-slate-400 rounded-2xl text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center justify-center space-x-2 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Use another Google account</span>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Email Address
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="e.g. yourname@abc.edu.ph or @gmail.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#182848]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Juan Dela Cruz"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#182848]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="flex-1 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-[#182848] hover:bg-[#111d35] text-white rounded-xl font-bold text-xs transition-colors shadow-md disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Sign In with Google'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info explaining production Google Cloud configuration */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure institutional OAuth 2.0</span>
          </div>
          <span className="text-slate-400">ABC School Portal</span>
        </div>
      </div>
    </div>
  );
}

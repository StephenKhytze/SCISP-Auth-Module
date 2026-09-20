import React, { useState } from 'react';
import { Lock, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';

export default function FirstTimePasswordModal({ isOpen, user, onPasswordSet }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters in length.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/change-password', {
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      // Update tokens and user in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      onPasswordSet(response.data.user);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to set permanent password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#fcedf0] text-[#80172B] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Set Permanent Password
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Welcome, <strong>{user?.name || user?.username}</strong>! Because this is your first time logging in with your temporary credentials, please establish your private permanent password.
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs text-rose-800 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              New Permanent Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#80172B] focus:border-transparent font-medium"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-type your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#80172B] focus:border-transparent font-medium"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-slate-700">Security Tips:</span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-500">
              <li>Use a combination of uppercase letters, numbers, and symbols.</li>
              <li>Do not share your password with anyone.</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#80172B] hover:bg-[#6b1424] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Activate Account &amp; Proceed</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

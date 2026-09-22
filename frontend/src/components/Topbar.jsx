import React, { useState } from 'react';
import { Bell, GraduationCap, Menu } from 'lucide-react';

export default function Topbar({
  currentUser = { name: 'Kirsten Eve Estiva', role: 'Student', department: 'BS Information Technology', idNumber: '2024-01214' },
  isMobileMenuOpen = false,
  onToggleMobileMenu = () => {},
  onCloseMobileMenu = () => {},
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const notifications = [
    { id: '1', text: 'New announcement published by Registrar', time: '10m ago', unread: true },
    { id: '2', text: 'Midterm Exam permit is ready for download', time: '1h ago', unread: true },
    { id: '3', text: 'Library book "High-Performance MySQL" due soon', time: '1d ago', unread: false },
  ];

  return (
    <header className="h-16 md:h-[86px] bg-[#80172B] text-white flex items-center justify-between px-4 sm:px-6 md:px-8 select-none relative z-30 shadow-md border-b-2 border-[#651020]">
      {/* Left on Desktop: ABC SCHOOL Brand Logo */}
      <div className="hidden md:flex items-center space-x-3">
        <div className="flex items-center cursor-pointer group">
          <div className="relative flex items-center">
            <span className="font-extrabold text-[40px] tracking-tighter text-white font-sans leading-none drop-shadow-sm">
              ABC
            </span>
            <span className="ml-1.5 px-1.5 py-[2px] bg-[#601020] border border-white/50 text-white text-[10px] font-bold tracking-wider rounded uppercase flex items-center shadow-inner self-start mt-2">
              SCHOOL
            </span>
          </div>
        </div>
      </div>

      {/* Left on Mobile: Burger Button when closed, ABC School logo when open */}
      <div className="md:hidden flex items-center">
        {!isMobileMenuOpen ? (
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="text-white p-1.5 -ml-1 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-7 h-7 text-white" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onCloseMobileMenu}
            className="flex items-center cursor-pointer group focus:outline-none"
            aria-label="Close sidebar menu"
          >
            <div className="relative flex items-center">
              <span className="font-extrabold text-[30px] tracking-tighter text-white font-sans leading-none drop-shadow-sm">
                ABC
              </span>
              <span className="ml-1.5 px-1.5 py-[2px] bg-[#601020] border border-white/50 text-white text-[9px] font-bold tracking-wider rounded uppercase flex items-center shadow-inner self-start mt-1.5">
                SCHOOL
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Right Controls: Notifications, Divider, Persona Profile */}
      <div className="flex items-center space-x-3 sm:space-x-5 md:space-x-6">

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserDropdown(false);
            }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 text-white fill-white" />
            {/* Notification gold badge matching image */}
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#D4A373] border-2 border-[#80172B] rounded-full shadow-sm"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 py-2 z-50 text-xs animate-in fade-in duration-150">
              <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between font-semibold text-gray-700">
                <span>Notifications</span>
                <span className="bg-[#80172B]/10 text-[#80172B] px-1.5 py-0.5 rounded text-[10px]">
                  2 New
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-gray-50">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 hover:bg-gray-50 transition-colors flex items-start space-x-2.5 ${
                      n.unread ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#80172B] mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-800 leading-snug">{n.text}</p>
                      <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-100 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] font-medium text-[#80172B] hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider (Desktop/Tablet) */}
        <div className="hidden md:block h-7 w-[1px] bg-white/20" />

        {/* User Persona Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-3 sm:space-x-4 group hover:opacity-95 transition-opacity focus:outline-none"
            title="View Profile"
          >
            {/* Persona Name & Role - Hidden in mobile view as specified */}
            <div className="hidden md:flex text-right flex-col justify-center leading-tight">
              <span className="font-bold text-base tracking-wide text-white group-hover:text-amber-100 transition-colors">
                {currentUser?.name || 'User'}
              </span>
              <span className="text-[12px] text-white/80 font-normal">
                {currentUser?.role || 'Guest'}
              </span>
            </div>

            {/* Circle Avatar with Graduation Cap Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white flex items-center justify-center shadow-md text-[#182848] border border-white/80 flex-shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-[#182848]" />
            </div>
          </button>

          {/* User Profile Popup */}
          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-2xl shadow-xl border border-gray-200 p-4 z-50 animate-in fade-in duration-150">
              <div className="flex items-center space-x-3 mb-2.5 pb-2.5 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#fcedf0] text-[#80172B] flex items-center justify-center font-bold flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-gray-900 truncate">{currentUser?.name || 'User'}</p>
                  <span className="inline-block px-1.5 py-0.5 bg-gray-100 text-[10px] font-semibold text-gray-600 rounded mt-0.5">
                    {currentUser?.role || 'Guest'}
                  </span>
                </div>
              </div>
              <div className="space-y-1 text-[11px] text-gray-500">
                <p><strong className="text-gray-700">Department:</strong> {currentUser?.department || 'N/A'}</p>
                <p><strong className="text-gray-700">ID Number:</strong> <span className="font-mono font-bold text-[#80172B]">{currentUser?.idNumber || 'N/A'}</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


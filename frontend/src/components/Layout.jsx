import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen m-0 p-0 overflow-hidden bg-gray-100">
      {/* Topbar spans the full width at the top */}
      <Topbar />
      
      {/* Container for Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 bg-[#f8f9fa]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

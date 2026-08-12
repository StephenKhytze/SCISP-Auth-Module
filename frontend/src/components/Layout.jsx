import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Sidebar />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <main style={{ padding: '2rem', backgroundColor: '#f5f5f5', flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

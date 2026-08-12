import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside style={{ width: '250px', backgroundColor: '#8a1c2b', color: 'white', padding: '1rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '2rem' }}>ABC School</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/schedule" style={{ color: 'white', textDecoration: 'none' }}>Schedule</Link>
        <Link to="/announcements" style={{ color: 'white', textDecoration: 'none' }}>Announcements</Link>
        <Link to="/library" style={{ color: 'white', textDecoration: 'none' }}>Library</Link>
        <Link to="/student-info" style={{ color: 'white', textDecoration: 'none' }}>Student Information</Link>
        <Link to="/faculty" style={{ color: 'white', textDecoration: 'none' }}>Faculty Directory</Link>
      </nav>
      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <Link to="/auth" style={{ color: 'white', textDecoration: 'none' }}>Sign Out</Link>
      </div>
    </aside>
  );
}

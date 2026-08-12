import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './modules/home/Dashboard';
import ScheduleView from './modules/schedule/ScheduleView';
import AnnouncementList from './modules/announcements/AnnouncementList';
import LibraryPortal from './modules/library/LibraryPortal';
import StudentProfile from './modules/student_info/StudentProfile';
import FacultyList from './modules/faculty/FacultyList';
import Login from './modules/auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route without Layout */}
        <Route path="/auth" element={<Login />} />
        
        {/* Main Routes wrapped in the template Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="schedule" element={<ScheduleView />} />
          <Route path="announcements" element={<AnnouncementList />} />
          <Route path="library" element={<LibraryPortal />} />
          <Route path="student-info" element={<StudentProfile />} />
          <Route path="faculty" element={<FacultyList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

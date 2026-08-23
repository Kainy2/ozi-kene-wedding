import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import MainPage from './pages/MainPage';
import FoodMenuPage from './pages/FoodMenuPage';
import WeddingProgrammePage from './pages/WeddingProgrammePage';
import RsvpPage from './pages/RsvpPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import RsvpListPage from './pages/admin/RsvpListPage';
import CreateInvitePage from './pages/admin/CreateInvitePage';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminLayout from './components/AdminLayout';

function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Main single-page routes */}
          <Route path="/" element={<MainPage />} />
          <Route path="/food-menu" element={<FoodMenuPage />} />
          <Route path="/wedding-programme" element={<WeddingProgrammePage />} />
          <Route path="/rsvp/:guestId" element={<RsvpPage />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="rsvps" element={<RsvpListPage />} />
              <Route path="create-invite" element={<CreateInvitePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;

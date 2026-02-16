import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import RequesterDashboard from './pages/RequesterDashboard';
import ApproverDashboard from './pages/ApproverDashboard';
import './index.css';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'APPROVER' ? '/approver' : '/requester'} />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

      <Route path="/requester" element={
        <ProtectedRoute role="REQUESTER">
          <RequesterDashboard />
        </ProtectedRoute>
      } />

      <Route path="/approver" element={
        <ProtectedRoute role="APPROVER">
          <ApproverDashboard />
        </ProtectedRoute>
      } />

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages'
import NotFoundPage from './pages/not-found'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import AdminDashboardPage from './pages/admin/dashboard'
import AdminAccountPage from './pages/admin/account'
import AdminUserPage from './pages/admin/user'
import AdminLeaveRequestPage from './pages/admin/leave-request'
import VerifikatorDashboardPage from './pages/verifikator/dashboard'
import VerifikatorAccountPage from './pages/verifikator/account'
import VerifikatorUserPage from './pages/verifikator/user'
import VerifikatorLeaveRequestPage from './pages/verifikator/leave-request'
import UserDashboardPage from './pages/user/dashboard'
import UserAccountPage from './pages/user/account'
import UserLeaveRequestPage from './pages/user/leave-request'
import ForbiddenPage from './pages/forbidden'

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/account" element={<AdminAccountPage />} />
      <Route path="/admin/user" element={<AdminUserPage />} />
      <Route path="/admin/leave-request" element={<AdminLeaveRequestPage />} />
      
      <Route path="/verifikator/dashboard" element={<VerifikatorDashboardPage />} />
      <Route path="/verifikator/account" element={<VerifikatorAccountPage />} />
      <Route path="/verifikator/user" element={<VerifikatorUserPage />} />
      <Route path="/verifikator/leave-request" element={<VerifikatorLeaveRequestPage />} />

      <Route path="/user/dashboard" element={<UserDashboardPage />} />
      <Route path="/user/account" element={<UserAccountPage />} />
      <Route path="/user/leave-request" element={<UserLeaveRequestPage />} />
    </Routes>
  )
}

export default App

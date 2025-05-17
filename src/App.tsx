import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages'
import NotFoundPage from './pages/not-found'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import AdminDashboardPage from './pages/admin/dashboard'
import VerifikatorDashboardPage from './pages/verifikator/dashboard'
import UserDashboardPage from './pages/user/dashboard'
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
      
      <Route path="/verifikator/dashboard" element={<VerifikatorDashboardPage />} />

      <Route path="/user/dashboard" element={<UserDashboardPage />} />
    </Routes>
  )
}

export default App

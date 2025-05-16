import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages'
import NotFoundPage from './pages/not-found'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import DashboardPage from './pages/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App

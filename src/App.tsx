import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages'
import NotFoundPage from './pages/not-found'

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

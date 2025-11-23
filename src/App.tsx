
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppShell from './components/AppShell'
import { Dashboard } from './pages/Dashboard'
import Market from './pages/Market'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' replace/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/market' element={<Market/>}/>
      </Routes>
    </AppShell>
  )
}

export default App

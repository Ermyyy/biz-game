
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppShell from './components/AppShell'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' replace/>}/>
        <Route path='/dashboard' element={<>Тут будет dashboad</>}/>
        <Route path='/market' element={<>Тут будет маркет</>}/>
      </Routes>
    </AppShell>
  )
}

export default App

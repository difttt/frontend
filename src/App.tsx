import './App.css'
import {
  Route,
  Routes,
} from 'react-router-dom'

// import Home from './pages/Home'
import AutoInvest from './pages/AutoInvest'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AutoInvest />} />
        {/* <Route path="home" element={<Home />} /> */}
      </Routes>
    </div>
  )
}

export default App

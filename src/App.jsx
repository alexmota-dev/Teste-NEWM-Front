import NavBar from './components/NavBar';
import './App.css'
import { Outlet } from 'react-router-dom';
function App() {

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default App

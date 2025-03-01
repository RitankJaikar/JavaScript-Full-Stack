import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Particle from './Particle.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Particle/>
    <App />
  </>
)

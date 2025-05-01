import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Function to initialize the app
const initApp = () => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// Check if the document is already loaded
if (document.readyState === 'complete') {
  initApp();
} else {
  // Use window load event to ensure the app initializes properly
  window.addEventListener('load', initApp);
}

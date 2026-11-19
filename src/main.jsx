import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'lenis/dist/lenis.css'
import './styles.css'
import App from './App.jsx'
import { PrefsProvider } from './prefs.jsx'

// HashRouter: berfungsi di hosting statis apa pun tanpa konfigurasi server.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrefsProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </PrefsProvider>
  </React.StrictMode>,
)

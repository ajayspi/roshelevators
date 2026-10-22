import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'

console.log('[ROSH] main.jsx loaded, attempting to mount React')

const rootEl = document.getElementById('root')
if (!rootEl) {
  console.error('[ROSH] #root element not found!')
} else {
  console.log('[ROSH] #root element found, creating React root')
  try {
    createRoot(rootEl).render(
      <StrictMode>
        <BrowserRouter>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </BrowserRouter>
      </StrictMode>,
    )
    console.log('[ROSH] React mounted successfully')
  } catch (e) {
    console.error('[ROSH] React mount failed:', e)
    rootEl.innerHTML = `<div style="padding:2rem;color:red;font-family:monospace">React mount error: ${e.message}<pre>${e.stack}</pre></div>`
  }
}
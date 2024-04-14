import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'highlight.js/styles/github.css'
import '@/assets/style/tailwind.css'
import '@/assets/style/reset.css'
import '@/assets/style/theme.css'
import '@/assets/style/icon.css'
import '@/assets/style/button.css'
import '@/assets/style/code.css'
import '@/assets/style/markdown.css'
import '@/assets/style/prose.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import 'highlight.js/styles/github.css'
import '@/assets/style/tailwind.css'
import '@/assets/style/reset.css'
import '@/assets/style/index.css'
import '@/plugins/dayjs.ts'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

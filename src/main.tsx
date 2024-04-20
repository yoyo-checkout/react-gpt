import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'highlight.js/styles/github.css'
import '@/assets/style/tailwind.css'
import '@/assets/style/reset.css'
import '@/assets/style/index.css'
import '@/plugins/dayjs.ts'
import store from '@/stores'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

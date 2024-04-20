import { BrowserRouter } from 'react-router-dom'
import { useInit } from '@/hooks/useInit'
import { RouteConf } from '@/routes/index'

const routerBaseName = import.meta.env.MODE === 'deploy' ? import.meta.env.VITE_DEPLOY_URL : '/'

function App() {
  useInit()
  return (
    <BrowserRouter basename={routerBaseName}>
      <RouteConf />
    </BrowserRouter>
  )
}

export default App

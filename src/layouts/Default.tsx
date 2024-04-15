import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export const Layout = () => {
  const addTheme = (theme: string) => document.querySelector('html')?.classList.add(theme)
  addTheme('dark')

  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden">
      <Sidebar />
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

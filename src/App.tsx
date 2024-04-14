import { Content } from '@/components/Content'
import { Sidebar } from '@/components/Sidebar'

function App() {
  const addTheme = (theme: string) => document.querySelector('html')?.classList.add(theme)
  addTheme('dark')

  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden">
      <Sidebar />
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
        <Content />
      </div>
    </div>
  )
}

export default App

// import { useState } from 'react'
import './App.css'
import { Sidebar } from '@/components/Sidebar'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="dark relative z-0 flex h-full w-full overflow-hidden">
      <Sidebar />
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
        <main className="relative h-full w-full flex-1 overflow-auto transition-width">content</main>
      </div>
      {/* <button onClick={() => setCount((count) => count + 1)}>count is {count}</button> */}
    </div>
  )
}

export default App

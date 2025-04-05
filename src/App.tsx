import { useState } from 'react'
import Dashboard from './components/Dashboard'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'

export default function App() {
  const [timeframe, setTimeframe] = useState({
    start: new Date(2024, 3, 1),
    end: new Date(2024, 3, 30),
  })

  return (
    <div 
      className="flex min-h-screen" 
      style={{ 
        background: 'linear-gradient(135deg, rgb(255 255 255) 0%, rgb(230 230 230) 100%)'
      }}
    >
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <SearchBar />
        <Dashboard 
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />
      </main>
    </div>
  )
}

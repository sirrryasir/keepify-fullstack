import {useState} from 'react'
import Auth from './components/Auth'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

  if(!token) {
    return <Auth onLoginSuccess={(data) => {
        setToken(data.token)
        setUser(data)
      }} />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>Welcome, {user?.name}!</h1>
    </div>
  )
}

export default App
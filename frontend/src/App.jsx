import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [error, setError] = useState(null)

  useEffect(() => {
    // Calling the Laravel Backend API test route
    axios.get('http://localhost:8000/api/test')
      .then(response => {
        setMessage(response.data.message)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to connect to the backend API. Make sure it is running.')
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Laravel API Setup</h1>
        
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div style={{ padding: '20px', border: '1px solid #646cff', borderRadius: '8px', marginTop: '20px' }}>
            <h3>Message from Backend:</h3>
            <p>{message}</p>
          </div>
        )}
      </header>
    </div>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import GithubProvider from './services/github'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GithubProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GithubProvider>
  </React.StrictMode>,
)

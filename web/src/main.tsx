import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { isEnvBrowser } from './utils/misc';
import { ThemeProvider } from './utils/Theme.tsx';

const root = document.getElementById('root');
if (isEnvBrowser()) {
  root!.classList.remove("light")
  root!.classList.add('dark')
  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/iPTAdYV.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='lsrp_scoreboard-theme'>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

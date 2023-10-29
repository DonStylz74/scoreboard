import './App.css'
import ScoreboardFrame from './Pages/ScoreboardFrame/ScoreboardFrame'
import { isEnvBrowser } from './utils/misc'
import '@mantine/core/styles.css'
import { MantineProvider, createTheme } from '@mantine/core'
import { useState } from 'react'


if (isEnvBrowser()) {
  document.body.style.backgroundImage = "url(https://img.gta5-mods.com/q95/images/dark-mood-reshade-2021/1e6f87-19.png)";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

const theme = createTheme({
  focusRing: "never",
});


function App() {
  //@ts-ignore
  const [customTheme, setCustomTheme] = useState({
    primaryColor: "violet"
  })

  return <MantineProvider theme={{ ...theme, ...customTheme }} defaultColorScheme='dark'>
    <ScoreboardFrame setTheme={(color: any) => setCustomTheme({
      primaryColor: color
    })}/>
  </MantineProvider>
}

export default App

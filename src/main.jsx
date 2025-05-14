import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import App from './App'
import './index.css'
import { store } from './redux/store'

// Update axios base URL to use HTTPS
axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>
)
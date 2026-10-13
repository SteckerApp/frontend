import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeConfig } from './theme/Theme.tsx'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeConfig>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeConfig>
  </StrictMode>,
)

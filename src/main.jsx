import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { TodoProvider } from './context/TodoContext.jsx'
import './index.css' // Importing Tailwind CSS styles

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TodoProvider>
            <App />
        </TodoProvider>
    </StrictMode>,
)

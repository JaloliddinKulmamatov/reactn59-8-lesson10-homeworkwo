import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MyProvider from './components/MyProvider.jsx'

createRoot(document.getElementById("root")).render(
    <MyProvider>
      <App />
    </MyProvider>
);

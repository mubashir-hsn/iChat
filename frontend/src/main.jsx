import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contextApi/AuthProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import { SocketProvider } from './contextApi/UseSocket.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <SocketProvider>
    <App />
    <Toaster />
    </SocketProvider>
  </AuthProvider>
  </BrowserRouter>
)

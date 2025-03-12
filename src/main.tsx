import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from './components/AuthProvider';
import {Toaster} from "@/components/ui/sonner.tsx";

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <QueryClientProvider client={queryClient}>
              <App />
              <Toaster richColors   />
          </QueryClientProvider>
      </AuthProvider>
  </StrictMode>,
)

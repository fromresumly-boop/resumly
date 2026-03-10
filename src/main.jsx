import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ResumeProvider, useResume } from './context/ResumeContext'
import Spinner from './components/ui/Spinner'

const Main = () => {
  const { loading } = useResume();
  
  if (loading) return <Spinner />;
  
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResumeProvider>
      <Main />
    </ResumeProvider>
  </StrictMode>,
)



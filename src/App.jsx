import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ImportantTools from './pages/ImportantTools'
import Documents from './pages/Documents'
import CustomerService from './pages/CustomerService'
import BillPayment from './pages/BillPayment'
import Agriculture from './pages/Agriculture'
import EducationHealth from './pages/EducationHealth'
import OperatorTools from './pages/OperatorTools'
import GovernmentSchemes from './pages/GovernmentSchemes'
import Services from './pages/Services'
import Certificates from './pages/Certificates'
import Jobs from './pages/Jobs'
import News from './pages/News'
import ServiceVideos from './pages/ServiceVideos'
import OperatorAccess from './pages/OperatorAccess'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const PAGES = { 
  dashboard: Dashboard, 
  important: ImportantTools, 
  documents: Documents, 
  certificates: Certificates, 
  chatbot: CustomerService, 
  billing: BillPayment, 
  services: Services, 
  schemes: GovernmentSchemes, 
  jobs: Jobs,
  news: News,
  videos: ServiceVideos,
  agriculture: Agriculture, 
  education: EducationHealth, 
  operator: OperatorTools,
  profile: Profile,
  settings: Settings
}

function RequireOperator() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}

function PublicAccess({ screen }) {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const go = useCallback(path => navigate(path), [navigate]);
  if (isAuthenticated) return <Navigate to="/app/dashboard" replace />
  const authenticate = session => { 
    signIn(session); 
    navigate(location.state?.from?.pathname || '/app/dashboard', { replace: true }) 
  }
  return <OperatorAccess screen={screen} onAuthenticated={authenticate} onNavigate={go} />
}

function WorkspaceLayout() {
  const { operator, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [lang, setLang] = useState('en');
  const [dark, setDark] = useState(false);

  useEffect(() => { 
    document.documentElement.classList.toggle('dark', dark);
    return () => document.documentElement.classList.remove('dark');
  }, [dark]);
  const logout = () => {
    signOut(); 
    navigate('/', { replace: true });
  }
  return(
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar 
        active={locationPage()} 
        onNav={page => navigate(`/app/${page}`)} 
        open={open} 
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: open ? 240 : 66, transition: 'margin-left .25s', minWidth: 0 }}>
        <Header 
          active={locationPage()} 
          onToggle={() => setOpen(value => !value)} 
          lang={lang} 
          onLang={setLang} 
          dark={dark} 
          onDark={setDark} 
          operator={operator} 
          onLogout={logout} 
          onNav={page => navigate(`/app/${page}`)}
        />
        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          <Outlet context={{ operator, navigate }} />
        </main>
      </div>
    </div>
  );
}

function locationPage() { return window.location.pathname.split('/')[2] || 'dashboard' }

function WorkspacePage() {
  const { page = 'dashboard' } = useParams();
  const navigate = useNavigate();
  const Page = PAGES[page]
  if (!Page) return <Navigate to="/app/dashboard" replace />
  return <Page onNav={nextPage => navigate(`/app/${nextPage}`)} lang="en" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicAccess screen="intro" />} />
      <Route path="/login" element={<PublicAccess screen="login" />} />
      <Route path="/register" element={<PublicAccess screen="register" />} />
      <Route element={<RequireOperator />}>
        <Route element={<WorkspaceLayout />}>
          <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="/app/:page" element={<WorkspacePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() { 
  return( 
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter> 
  );
}

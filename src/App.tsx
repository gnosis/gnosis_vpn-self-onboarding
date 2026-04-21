import { useEffect, useState } from 'react';
import { useAppStore } from './store/appStore';
import PrivacyPolicy from './components/PrivacyPolicy';
import LoadingOverlay from './components/LoadingOverlay';
import LandingPage from './views/LandingPage'
import Login from './views/Login';
import Onboarding from './views/Onboarding';
import ChangePassword from './views/ChangePassword';
import { fetchFundingCode, getTokenExpiry, refreshToken, getJsonData } from './functions';

export type AppView =
  'login' |
  'landing' |
  'onboarding' |
  'changePassword'
;

function App() {
  const currentView = useAppStore((state) => state.currentView);
  const setToken = useAppStore((state) => state.setToken);
  const setOnboardingData = useAppStore((state) => state.setOnboardingData);
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const setAutoLoading = useAppStore((state) => state.setAutoLoading);
  const setUsername = useAppStore((state) => state.setUsername);

  useEffect(() => {
    const loadAndRefreshToken = async () => {
      const token = localStorage.getItem('gvso_authToken');
      if (!token) return;

      const expiry = getTokenExpiry(token);
      if (!expiry || expiry <= Date.now()) {
        localStorage.removeItem('gvso_authToken');
        return;
      }

      setAutoLoading(true);
      setToken(token);
      fetchFundingCode(token);
      
      const result = await refreshToken(token);
      if (result.success && result.token) {
        localStorage.setItem('gvso_authToken', result.token);
        setToken(result.token);

        const payload = JSON.parse(atob(result.token.split('.')[1]));
        console.log('Token payload:', payload);
        if (payload.username) setUsername(payload.username);

        const jsonDataResult = await getJsonData(result.token);
        if (jsonDataResult.success && jsonDataResult.jsonData) {
          console.log('User JSON data:', jsonDataResult.jsonData);
          const jsonData = jsonDataResult.jsonData as Record<string, unknown>;
          setOnboardingData(jsonData as Parameters<typeof setOnboardingData>[0]);
        }

        setCurrentView('landing');
      }

      setAutoLoading(false);
    };

    loadAndRefreshToken();
  }, [setToken, setCurrentView, setAutoLoading]);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const token = localStorage.getItem('gvso_authToken');
      if (!token) return;

      const expiry = getTokenExpiry(token);
      if (!expiry) return;

      const now = Date.now();
      const timeUntilExpiry = expiry - now;
      const twelveHours = 12 * 60 * 60 * 1000;

      if (timeUntilExpiry < twelveHours) {
        const result = await refreshToken(token);
        if (result.success && result.token) {
          localStorage.setItem('gvso_authToken', result.token);
          setToken(result.token);
        }
      }
    };

    const interval = setInterval(checkAndRefreshToken, 10 * 60 * 1000);
    checkAndRefreshToken();

    return () => clearInterval(interval);
  }, [setToken]);

  

  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(() => window.location.hash === '#privacyPolicy');

  useEffect(() => {
    const handleHashChange = () => {
      setShowPrivacyPolicy(window.location.hash === '#privacyPolicy');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleClose = () => {
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setShowPrivacyPolicy(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <Login />;
      case 'landing':
        return <LandingPage />;
      case 'onboarding':
        return <Onboarding />;
      case 'changePassword':
        return <ChangePassword />;
      default:
        return <Login />;
    }
  };

  return (
    <div className="App">
      <PrivacyPolicy open={showPrivacyPolicy} onClose={handleClose} />
      <LoadingOverlay />
      {renderView()}
    </div>
  )
}

export default App

// add ip check in the topbar

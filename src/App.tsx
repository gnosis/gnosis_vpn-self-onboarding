import { useEffect } from 'react';
import { useAppStore } from './store/appStore';
import LoadingOverlay from './components/LoadingOverlay';
import LandingPage from './views/LandingPage'
import Login from './views/Login';
import Onboarding from './views/Onboarding';
import ChangePassword from './views/ChangePassword';
import { fetchFundingCode } from './functions';

/**
 * Decode JWT and get expiry time
 */
function getTokenExpiry(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

/**
 * Refresh JWT token
 */
async function refreshToken(token: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const response = await fetch(`${import.meta.env.VITE_WEBAPI_URL}/api/gnosisvpn-self-onboarding/refresh-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || `HTTP Error: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      token: data.token,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

/**
 * Get JSON data using JWT token
 */
async function getJsonData(token: string): Promise<{ success: boolean; jsonData?: object; error?: string }> {
  try {
    const response = await fetch(`${import.meta.env.VITE_WEBAPI_URL}/api/gnosisvpn-self-onboarding/getJsonData`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || `HTTP Error: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      jsonData: data.jsonData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

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
          setOnboardingData(jsonDataResult.jsonData as Parameters<typeof setOnboardingData>[0]);
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
      <LoadingOverlay />
      {renderView()}
    </div>
  )
}

export default App

// add ip check in the topbar

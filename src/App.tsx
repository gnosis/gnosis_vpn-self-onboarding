import { useAppStore } from './store/appStore';
import LandingPage from './views/LandingPage'
import Login from './views/Login';
import Onboarding from './views/Onboarding';

export type AppView = 
  'login' | 
  'landing' |
  'onboarding'
;

function App() {
  const currentView = useAppStore((state) => state.currentView);

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <Login />;
      case 'landing':
        return <LandingPage />;
      case 'onboarding':
        return <Onboarding />;
      default:
        return <Login />;
    }
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  )
}

export default App

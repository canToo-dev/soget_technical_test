import './App.scss';
import Todos from './pages/todos';
import AuthenticationContext from './functions/authenticationContextProvider';
import useAuthentication from './hooks/useAuthentication';
import Auth from './pages/auth';
function App() {
  const authCtx = useAuthentication();
  
  return (
    <AuthenticationContext.Provider value={authCtx}>
      {
        authCtx.authState.authenticated &&
        <Todos/>
        ||
        <Auth/>
      }
    </AuthenticationContext.Provider>
  );
}

export default App;

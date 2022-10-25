import logo from './logo.svg';
import './App.scss';
import useFetch from './hooks/useFetch';
import { useEffect } from 'react';
import Todo from './components/todo';
import AuthenticationContext from './functions/authenticationContextProvider';
import useAuthentication from './hooks/useAuthentication';
import Auth from './pages/auth';
function App() {
  const authCtx = useAuthentication();
  const [r, e] = useFetch("http://localjhost:3001/todos");
  useEffect(()=>{
    //console.log(e);
  }, [e])
  return (
    <AuthenticationContext.Provider value={authCtx}>
      {
        authCtx.authState.authenticated &&
        <></>
        ||
        <Auth></Auth>

      }
    </AuthenticationContext.Provider>
  );
}

export default App;

import './App.scss';
import AuthenticationContext from './functions/authenticationContextProvider';
import useAuthentication from './hooks/useAuthentication';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
function App() {
  const authCtx = useAuthentication();
  
  return (
    <AuthenticationContext.Provider value={authCtx}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:slug' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </AuthenticationContext.Provider>
  );
}

export default App;

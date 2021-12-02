import React from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth';
import { AuthContext } from './context/AuthContext';
import { NavBar } from './components/NavBar';
import { Loader } from './components/Loader';
import 'materialize-css';

function App() {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  debugger;
  if (!ready) {debugger;
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
      {isAuthenticated && <NavBar/>}
      <div className='container'>
        {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;

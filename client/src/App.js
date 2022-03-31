import { Switch, Route } from 'react-router-dom';
import app from './App.module.css';

import Landing from './pages/Landing';
import Auth from './pages/Auth';
import AuthContextProvider from './contexts/AuthContext';
import CategoriesPage from './pages/Categories';

import ProtectedRoute from './components/routing/ProtectedRoute';
import ContactContextProvider from './contexts/ContactContext';
import CategoryContextProvider from './contexts/CategoryContext';
import ContactPage from './pages/Contact';

function App() {
  return (
    <AuthContextProvider>
      <ContactContextProvider>
        <CategoryContextProvider>
          <div className={('container-fluid', app['homepage-bgimage'])}>
            <Switch>
              <Route
                exact
                path='/login'
                render={(props) => <Auth {...props} authRoute='login' />}
              />
              <Route
                exact
                path='/register'
                render={(props) => <Auth {...props} authRoute='register' />}
              />
              <ProtectedRoute path='/' exact component={Landing} />
              <ProtectedRoute path='/contact' component={ContactPage} />
              <ProtectedRoute
                exact
                path='/categories'
                component={CategoriesPage}
              />
            </Switch>
          </div>
        </CategoryContextProvider>
      </ContactContextProvider>
    </AuthContextProvider>
  );
}

export default App;

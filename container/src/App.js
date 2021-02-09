import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Redirect, Switch, Route } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { createBrowserHistory } from 'history'
import Header from './components/Header';

const MarketingLazy = lazy(() => import('./apps/MarketingApp'));
const AuthLazy = lazy(() => import('./apps/AuthApp'));
const DashboardLazy = lazy(() => import('./apps/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard')
    }
  }, [isSignedIn])

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
        <Suspense fallback={<div>loading microfrontend......</div>}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardLazy />
            </Route>
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  )
}
import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import SignIn from './components/Signin';
import SignUp from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au'
})

export default ({ history }) => {
  return <>
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Switch>
          <Route exact component={SignIn} path="/auth/signin" />
          <Route exact component={SignUp} path="/auth/signup" />
        </Switch>
      </Router>
    </StylesProvider>
  </>
}
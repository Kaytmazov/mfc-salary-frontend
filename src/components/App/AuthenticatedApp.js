import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import AppHeader from '../AppHeader';

import SalaryReportPage from '../../pages/salary-report-page';
import NotFoundPage from '../../pages/not-found-page';

import FullPageSpinner from '../shared/FullPageSpinner';

import { ReactComponent as SvgSprite } from '../../assets/sprite.svg';

import { useAuthUserQuery } from '../../hooks/authUser';
import { useAuth } from '../../context/auth-context';

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  const { isLoading, isError } = useAuthUserQuery();

  React.useEffect(() => {
    if (isError) {
      logout();
    }
  }, [logout, isError]);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <>
      <div className="app">
        <AppHeader />
        <main className="app-content">
          <Container fluid>
            <Switch>
              <Redirect from="/" to="/salary-report" exact />

              <Route path="/salary-report">
                <SalaryReportPage />
              </Route>

              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
      <SvgSprite className="d-none" />
    </>
  );
};

export default AuthenticatedApp;

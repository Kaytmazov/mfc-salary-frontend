import { Switch, Route, Redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import AppHeader from '../AppHeader';

import EmployeesPage from '../../pages/employees-page';
import NotFoundPage from '../../pages/not-found-page';

import { ReactComponent as SvgSprite } from '../../assets/sprite.svg';

const AuthenticatedApp = () => (
  <>
    <div className="app">
      <AppHeader />
      <main className="app-content">
        <Container fluid>
          <Switch>
            <Redirect from="/" to="/employees" exact />

            <Route path="/employees">
              <EmployeesPage />
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

export default AuthenticatedApp;

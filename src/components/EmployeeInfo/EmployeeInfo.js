import { Switch, Route, NavLink, Redirect, useParams, useRouteMatch } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';

import Icon from '../shared/Icon';

import EmployeeJobPositions from '../EmployeeJobPositions';

const NAV_ITEMS = [
  {
    label: 'Должности',
    icon: 'positions',
    link: '/positions',
  },
  {
    label: 'Зарплата',
    icon: 'salaries',
    link: '/salaries',
  },
];

const EmployeeInfo = () => {
  const { id } = useParams();
  const { path, url } = useRouteMatch();

  return (
    <>
      <Nav variant="tabs" defaultActiveKey={url} justify>
        {NAV_ITEMS.map(({ label, icon, link }) => (
          <Nav.Item key={icon}>
            <Nav.Link as={NavLink} to={url + link}>
              <Icon name={icon} className="mr-3" width="24px" height="24px" />
              {label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <Switch>
        <Redirect from={`${url}/`} to={`${url}/positions`} exact />
        <Route path={`${path}/positions`} exact>
          <EmployeeJobPositions employeeId={id} />
        </Route>
        <Route path={`${path}/salaries`} exact>
          Зарплата
        </Route>
        <Redirect to={`${url}/positions`} />
      </Switch>
    </>
  );
};

export default EmployeeInfo;

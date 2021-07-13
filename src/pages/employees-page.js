import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Employees from '../components/Employees';

const EmployeesPage = () => {
  const { path } = useRouteMatch();

  return (
    <Row>
      <Col>
        <Employees />
      </Col>

      <Col>
        <Switch>
          <Route path={`${path}/:id`}>asdfasdf</Route>
        </Switch>
      </Col>
    </Row>
  );
};

export default EmployeesPage;

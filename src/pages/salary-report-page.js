import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

import SalaryReport from '../components/SalaryReport';
import EmployeeInfo from '../components/EmployeeInfo';

const SalaryReportPage = () => {
  const { path } = useRouteMatch();

  return (
    <Card>
      <Card.Body>
        <Row className="flex-nowrap">
          <Col md={7}>
            <SalaryReport />
          </Col>

          <Col className="pl-5">
            <Switch>
              <Route path={`${path}/:id`}>
                <EmployeeInfo />
              </Route>
              <Route>
                <Alert variant="secondary">Выберите сотрудника</Alert>
              </Route>
            </Switch>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SalaryReportPage;

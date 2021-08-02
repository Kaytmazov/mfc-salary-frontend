import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import Icon from '../Icon';

import convertDate from '../../../utils/convertDate';

const InfoTooltipIcon = ({ employeeFioAdd, employeeIdAdd, dateAdd, comment }) => (
  <OverlayTrigger
    trigger="focus"
    placement="left"
    overlay={
      <Popover id="popover-basic">
        <Popover.Title>Информация</Popover.Title>
        <Popover.Content>
          <div className="text-left">
            <p>
              <b>Кто добавил:</b>
              <br />
              <Link to={`/employees/employees/${employeeIdAdd}`} className="link-dashed">
                {employeeFioAdd}
              </Link>
            </p>
            <p>
              <b>Дата добавления:</b>
              <br />
              {convertDate(dateAdd, 'dd.MM.yyyy HH:mm:ss')}
            </p>
            {comment ? (
              <>
                <b>Комментарий:</b>
                <br />
                {comment}
              </>
            ) : null}
          </div>
        </Popover.Content>
      </Popover>
    }
  >
    <Button variant="icon">
      <Icon name="info" className="secondary" width="20px" height="20px" />
    </Button>
  </OverlayTrigger>
);

InfoTooltipIcon.defaultProps = {
  comment: undefined,
};

InfoTooltipIcon.propTypes = {
  employeeFioAdd: string.isRequired,
  employeeIdAdd: string.isRequired,
  dateAdd: string.isRequired,
  comment: string,
};

export default InfoTooltipIcon;

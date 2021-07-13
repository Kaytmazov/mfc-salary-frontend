import React from 'react';
import { Link } from 'react-router-dom';

import NavDropdown from 'react-bootstrap/NavDropdown';

import { useAuth } from '../../context/auth-context';
import convertFIO from '../../utils/convertFIO';

const HeaderUser = () => {
  const { user, logout } = useAuth();

  return (
    <NavDropdown title={convertFIO(user.fio)} alignRight>
      <NavDropdown.Item as={Link} to="/lk">
        Мой профиль
      </NavDropdown.Item>
      <NavDropdown.Item>Сменить пароль</NavDropdown.Item>
      <NavDropdown.Item onClick={logout}>Выйти</NavDropdown.Item>
    </NavDropdown>
  );
};

export default HeaderUser;

import { useCallback, useState } from 'react';
import { connect } from 'react-redux';

import NavBarComponent from './NavBar.component';
import { logout as logoutAction } from '../Auth/Auth.action';

const NavBar = (props) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = useCallback(() => {
    setToggle(!toggle);
  }, [setToggle, toggle])

  const handleLogout = useCallback(() => {
    props.logout({ meta: { history: props.history } });
  }, [props])

  return (
    <NavBarComponent
      toggle={toggle}
      handleToggle={handleToggle}
      handleLogout={handleLogout}
      {...props}
    />
  );
};

export default connect(null, { logout: logoutAction })(NavBar);

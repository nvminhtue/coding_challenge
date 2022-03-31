import { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import DashboardComponent from './Dashboard.component';
import { refreshToken as refreshTokenAction, saveLoginInfo as saveLoginInfoAction } from '../Auth/Auth.action';
import { userInfoSelector } from '../Auth/Auth.selector';
import { getToken } from '../../services/api/utils/helpers'

const Dashboard = (props) => {
  useEffect(() => {
    props.refreshToken();
    const token = getToken();
    if (!token) {
      props.history.push('/');
    }
    const { userId, username } = jwtDecode(token);
    props.saveLoginInfo({ userId, username })
  }, [props]);


  return props.userId && (
    <DashboardComponent
      {...props}
    />
  );
};

export default compose(
  connect(userInfoSelector, { refreshToken: refreshTokenAction, saveLoginInfo: saveLoginInfoAction }),
)(Dashboard);

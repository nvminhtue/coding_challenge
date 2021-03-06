import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import DashboardComponent from './Dashboard.component';
import { refreshToken as refreshTokenAction, saveLoginInfo as saveLoginInfoAction } from '../Auth/Auth.action';
import { userInfoSelector } from '../Auth/Auth.selector';
import { getToken } from '../../services/api/utils/helpers'

const Dashboard = (props) => {
  const [triggerRequestPage, setTriggerRequest] = useState(false);
  useEffect(() => {
    const token = getToken();
    if (!token || props.userId) {
      const retryToken  = props.refreshToken();
      if (!retryToken) props.history.push('/');
    } else {
      const { userId, username } = jwtDecode(token);
      props.saveLoginInfo({ userId, username })
    }
  }, [props]);


  return props.userId && (
    <DashboardComponent
      {...{ triggerRequestPage, setTriggerRequest }}
      {...props}
    />
  );
};

export default compose(
  connect(userInfoSelector, { refreshToken: refreshTokenAction, saveLoginInfo: saveLoginInfoAction }),
)(Dashboard);

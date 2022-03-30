import { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import DashboardComponent from './Dashboard.component';
import { refreshToken as refreshTokenAction } from '../Auth/Auth.action';
import { getToken } from '../../services/api/utils/helpers'

const Dashboard = (props) => {
  useEffect(() => {
    props.refreshToken();
    const token = getToken();
    if (!token) props.history.push('/');
  }, [props]);


  return (
    <DashboardComponent
      {...props}
    />
  );
};

export default compose(
  connect(null, { refreshToken: refreshTokenAction }),
)(Dashboard);

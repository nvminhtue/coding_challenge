import React from 'react';

import * as Styled from './styled';
import SearchList from '../SearchList/SearchList.container';
import NavBar from '../NavBar/NavBar.container';
import UploadZone from '../UploadZone/UploadZone.container';
import LoadingIndicator from '../common/LoadingIndicator';

const Dashboard = (props) => {

  return (
    <Styled.DashboardContainer>
      <LoadingIndicator />
      <NavBar {...props} />
      <UploadZone {...props } />
      <SearchList {...props} />
    </Styled.DashboardContainer>
  )
}

export default React.memo(Dashboard);

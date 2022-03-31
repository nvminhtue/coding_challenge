import React, { useState } from 'react';
import styled from 'styled-components';
import { Pagination } from 'react-pagination-bar'

import SearchList from '../SearchList/SearchList.container';
import NavBar from '../NavBar/NavBar.container';
import UploadZone from '../UploadZone/UploadZone.container';

const DashboardContainer = styled('section')`
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const PaginationContainer = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: auto;
`;

const Dashboard = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 3;

  return (
    <DashboardContainer>
      <NavBar {...props} />
      <UploadZone />
      <SearchList {...props} />
      <PaginationContainer>
        <Pagination
          initialPage={currentPage}
          itemsPerPage={pagePostsLimit}
          withProgressBar={true}
          onPageСhange={(pageNumber) => setCurrentPage(pageNumber)}
          totalItems={10}
          pageNeighbours={2}
        />
      </PaginationContainer>
    </DashboardContainer>
  )
}

export default React.memo(Dashboard);

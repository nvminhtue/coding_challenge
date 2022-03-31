import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons'

import * as Styled from './styled';

const SearchList = () => {
  return (
    <Styled.Table>
      <Styled.THeader>
        <Styled.HeaderRow>
          <Styled.Header>Keyword</Styled.Header>
          <Styled.Header>Searched at</Styled.Header>
          <Styled.Header>Status</Styled.Header>
        </Styled.HeaderRow>
      </Styled.THeader>
      <Styled.TBody>
        <Styled.BodyRow>
          <Styled.SearchValue>Tue</Styled.SearchValue>
          <Styled.BodyDetail>20/12/2000</Styled.BodyDetail>
          <Styled.StatusResult isPending>
            <FontAwesomeIcon icon={faCircleDot} fontSize={8} />
            <Styled.StatusText>
              Pending
            </Styled.StatusText>
          </Styled.StatusResult>
        </Styled.BodyRow>
        <Styled.BodyRow>
          <Styled.SearchValue>Tue</Styled.SearchValue>
          <Styled.BodyDetail>20/12/2000</Styled.BodyDetail>
          <Styled.StatusResult>
            <FontAwesomeIcon icon={faCircleDot} fontSize={8} />
            <Styled.StatusText>
              Success
            </Styled.StatusText>
          </Styled.StatusResult>
        </Styled.BodyRow>
        <Styled.BodyRow>
          <Styled.SearchValue>Tue</Styled.SearchValue>
          <Styled.BodyDetail>20/12/2000</Styled.BodyDetail>
          <Styled.StatusResult>
            <FontAwesomeIcon icon={faCircleDot} fontSize={8} />
            <Styled.StatusText>
              Success
            </Styled.StatusText>
          </Styled.StatusResult>
        </Styled.BodyRow>
      </Styled.TBody>
    </Styled.Table>
  )
}

export default React.memo(SearchList);

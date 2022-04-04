import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { Triangle } from 'react-loader-spinner';
import styled from 'styled-components';

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();

  const LoadingContainer = styled('div')`
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255,255,255,0.7);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    promiseInProgress &&
    <LoadingContainer>
      <Triangle color="#201546" height="100" width="100" />
    </LoadingContainer >
  );
}

export default LoadingIndicator;

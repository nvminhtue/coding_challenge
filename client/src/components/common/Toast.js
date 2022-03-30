import React from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const ToastContainerStyle = styled.div`
  position: absolute;
  white-space: pre-wrap;
`;

export const MainToast = () => (
  <ToastContainerStyle>
    <ToastContainer
      position="top-right"
      newestOnTop
      autoClose={2500}
    />
  </ToastContainerStyle>
);

import styled from 'styled-components';

export const UploadZoneContainer = styled('div')`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 5px;
`;

export const UploadButton = styled('button')`
  background-color: #FF8200;
  border: 1px;
  color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 20px;

  &:hover {
    box-shadow: 0 2px 6px 0 rgb(0 118 255 / 29%);
    cursor: pointer;
  }
`;

export const UploadText = styled('span')`
  margin: 0 0 0 4px;
`;

export const UploadedFile = styled('p')`
  margin: 0 8px 0 0;
  color: gray;
  font-style: italic;
`;

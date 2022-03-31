import styled, { css } from 'styled-components';

export const Table = styled('table')`
  padding: 10px;
  width: 100%;
  table-layout: fixed;
  color: #AEB5C0;
  word-break: break-all;
`;

export const THeader = styled('thead')``;

export const HeaderRow = styled('tr')`
  border-bottom: 1px solid #8d8d8d;
`;

export const Header = styled('th')`
  padding: 10px;
  text-align: left;
  color: #bbbaba;
  white-space: nowrap;
  border-bottom: 1px solid #e8e8e8;
`;

export const TBody = styled('tbody')``;

export const BodyRow = styled('tr')`

  &:hover {
    background-color: #e4e4e4;
    cursor: pointer;
  }
`;

export const BodyDetail = styled('td')`
  vertical-align: middle;
  padding: 10px;
  color: #000000;
  border-bottom: 1px solid #e8e8e8;
  font-size: 14px;
`;

export const SearchValue = styled(BodyDetail)`
  font-weight: bold;
`;

export const StatusResult = styled(BodyDetail)`
    color: #37ac37;
    display: flex;
    align-items: center;

  ${props => props.isPending && css`
    color: #ffb324;
  `}
`;

export const StatusText = styled('p')`
  margin: 0 0 0 4px;
`;

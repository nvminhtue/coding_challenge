import styled, { css } from 'styled-components';
import { SearchStatus } from '../Dashboard/Dashboard.constant';

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

export const SmallHeader = styled(Header)`
  width: 100px;
`;

export const TBody = styled('tbody')``;

export const BodyRow = styled('tr')`
  &:nth-child(even) {
    background-color: #e4e4e4;
  }

  &:hover {
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

export const StatusResult = styled('div')`
  display: flex;
  align-items: center;

  ${props => {
    let color;
    switch (props.status) {
      case SearchStatus.Pending:
        color = '#ffb324';
        break;
      case SearchStatus.Success:
        color = '#37ac37';
        break;
      case SearchStatus.Fail:
      default:
        color = '#f14320';
        break;
    }

    return css`color: ${color}`
  }}
`;

export const StatusText = styled('p')`
  margin: 0 0 0 4px;
`;

export const PaginationContainer = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 10px;
`;

export const SearchContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PreviewWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;

export const IframePreviewContent = styled('iframe')`
  width: 80vw;
  height: 80vh;
  margin: 0px;
  padding: 0px;
  border: 1px solid rgb(204 204 204);
  border-radius: 4px;
`;

export const Preview = styled('div')`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

export const DisplayNoResult = styled('div')`
  display: flex;
  justify-content: center;
  color: gray;
`;

export const ModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    padding: '0',
    transform: 'translate(-50%, -50%)',
  },
};

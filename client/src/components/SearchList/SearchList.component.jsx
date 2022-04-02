import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faTelevision } from '@fortawesome/free-solid-svg-icons'
import { Pagination } from 'react-pagination-bar'
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import * as Styled from './styled';
import { SearchStatus } from '../Dashboard/Dashboard.constant';
import { timeConverter } from '../../utils/helpers/timeConverter'
import isUndefinedOrNull from '../../utils/helpers/isUndefinedOrNull'

Modal.setAppElement('#root')

const SearchList = ({
  currentPage,
  pagePostsLimit,
  setCurrentPage,
  searchItems,
  pagyInfo,
  handleToggleModal,
  modalIsOpen,
  content
}) => {
  return (
    <Styled.SearchContainer>
      <Styled.Table>
        <Styled.THeader>
          <Styled.HeaderRow>
            <Styled.Header>Keyword</Styled.Header>
            <Styled.Header>Imported at</Styled.Header>
            <Styled.Header>Results</Styled.Header>
            <Styled.SmallHeader>AdWords total</Styled.SmallHeader>
            <Styled.SmallHeader>Link total</Styled.SmallHeader>
            <Styled.Header>Status</Styled.Header>
            <Styled.Header>Preview</Styled.Header>
          </Styled.HeaderRow>
        </Styled.THeader>
        <Styled.TBody>
          {searchItems && searchItems.map(({
            searchValue,
            runAt,
            status,
            searchResult,
          }, index) => (
            <Styled.BodyRow key={index}>
              <Styled.SearchValue>{searchValue}</Styled.SearchValue>
              <Styled.BodyDetail>{runAt ? timeConverter(runAt) : ''}</Styled.BodyDetail>
              <Styled.BodyDetail>{searchResult?.searchFound || ''}</Styled.BodyDetail>
              <Styled.BodyDetail>{!isUndefinedOrNull(searchResult?.adWordsTotal) ? searchResult?.adWordsTotal : ''}</Styled.BodyDetail>
              <Styled.BodyDetail>{!isUndefinedOrNull(searchResult?.linkTotal) ? searchResult?.linkTotal : ''}</Styled.BodyDetail>
              <Styled.BodyDetail>
                {!isUndefinedOrNull(status) && (
                  <Styled.StatusResult status={status}>
                    <FontAwesomeIcon icon={faCircleDot} fontSize={8} />
                    <Styled.StatusText>
                      {Object.keys(SearchStatus)[`${status}`]}
                    </Styled.StatusText>
                  </Styled.StatusResult>
                )}
              </Styled.BodyDetail>
              <Styled.BodyDetail>
                {searchResult?.preview && (
                  <Styled.Preview onClick={() => handleToggleModal(searchResult.preview)}>
                    <FontAwesomeIcon icon={faTelevision} fontSize={10} />
                    <Styled.StatusText>
                      PREVIEW
                    </Styled.StatusText>
                  </Styled.Preview>
                )}
              </Styled.BodyDetail>
            </Styled.BodyRow>
          ))}
        </Styled.TBody>
      </Styled.Table>
      <Styled.PaginationContainer>
        <Pagination
          initialPage={currentPage}
          itemsPerPage={pagePostsLimit}
          withProgressBar={true}
          onPageСhange={(pageNumber) => setCurrentPage(pageNumber)}
          totalItems={pagyInfo.total}
          pageCount={pagyInfo.pageCount}
        />
      </Styled.PaginationContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleToggleModal}
        style={Styled.ModalStyle}
        contentLabel="Example Modal"
      >
        <Styled.IframePreviewContent srcDoc={content} title='preview'></Styled.IframePreviewContent>
      </Modal>
    </Styled.SearchContainer>
  )
}

SearchList.propsType = {
  currentPage: PropTypes.number,
  pagePostsLimit: PropTypes.number,
  setCurrentPage: PropTypes.func,
  searchItems: PropTypes.Object,
  pagyInfo: PropTypes.Object,
  handleToggleModal: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  content: PropTypes.string
}

export default React.memo(SearchList);

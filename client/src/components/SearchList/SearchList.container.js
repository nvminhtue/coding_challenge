import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import SearchListComponent from './SearchList.component';
import { fetchSearch as fetchSearchAction } from '../Dashboard/Dashboard.action';
import { searchInfoSelector } from '../Dashboard/Dashboard.selector';
import { PagyConstant } from '../Dashboard/Dashboard.constant';

const SearchList = (props) => {
  const { pagyInfo, triggerRequestPage, setTriggerRequest } = props;
  const { fetchSearch } = props;
  const [currentPage, setCurrentPage] = useState(pagyInfo.page || PagyConstant.FirstPage);
  const pagePostsLimit = PagyConstant.PageItems;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');

  const handleToggleModal = useCallback((content => {
    setIsOpen(!modalIsOpen)
    setContent(content)
  }), [modalIsOpen])

  useEffect(() => {
    fetchSearch({
      page: currentPage,
      count: pagePostsLimit,
    })
    setTriggerRequest(false);
  }, [fetchSearch, currentPage, pagePostsLimit, triggerRequestPage, setTriggerRequest])

  return (
    <SearchListComponent
      {...{
        currentPage,
        setCurrentPage,
        pagePostsLimit,
        handleToggleModal,
        setIsOpen,
        modalIsOpen,
        content,
      }}
      {...props}
    />
  );
};

export default connect(
  searchInfoSelector,
  { fetchSearch: fetchSearchAction }
)(SearchList);

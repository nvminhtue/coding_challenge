import { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UploadZoneComponent from './UploadZone.component';
import { uploadCsv as uploadCsvAction } from '../Dashboard/Dashboard.action';
import { userInfoSelector } from '../Auth/Auth.selector';

const UploadZone = (props) => {
  const [uploadFile, setUploadFile] = useState();
  const { uploadCsv } = props; 
  
  const submitForm = useCallback((event) => {
    event.preventDefault();

    const dataArray = new FormData();
    dataArray.append("uploadFile", uploadFile);

    uploadCsv(dataArray)
  }, [uploadCsv, uploadFile]);

  return (
    <UploadZoneComponent
      {...{
        submitForm,
        setUploadFile,
        uploadFile,
      }}
      {...props}
    />
  );
};

UploadZone.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default connect(
  userInfoSelector, { uploadCsv: uploadCsvAction }
)(UploadZone);

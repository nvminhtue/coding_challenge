import { useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UploadZoneComponent from './UploadZone.component';
import { uploadCsv as uploadCsvAction } from '../Dashboard/Dashboard.action';
import { userInfoSelector } from '../Auth/Auth.selector';

const UploadZone = (props) => {
  const [uploadFile, setUploadFile] = useState();
  const inputFileRef = useRef();
  const inputSubmitRef = useRef();

  const { uploadCsv, setTriggerRequest } = props; 

  const handleUpload = () => {
    inputFileRef.current.click();
  }

  const handleChangeFile = (e) => {
    setUploadFile(e.target.files[0])
    e.target.value = null;
  }

  const handleSubmit = () => {
    inputSubmitRef.current.click();
    setUploadFile();
    setTriggerRequest(true)
  }

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
        uploadFile,
        inputFileRef,
        inputSubmitRef,
        handleUpload,
        handleSubmit,
        handleChangeFile,
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

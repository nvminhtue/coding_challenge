import { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UploadZoneComponent from './UploadZone.component';
import { uploadCsv as uploadCsvAction } from '../Dashboard/Dashboard.action';
import { userInfoSelector } from '../Auth/Auth.selector';

const UploadZone = (props) => {
  const [uploadFile, setUploadFile] = useState();
  const { uploadCsv } = props; 
  // const [uploadResponse, setUploadResponse] = useState();
  
  const submitForm = useCallback((event) => {
    event.preventDefault();

    const dataArray = new FormData();
    dataArray.append("uploadFile", uploadFile);

    uploadCsv(dataArray)

    // axios
    //   .post("/", dataArray, {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   })
    //   .then((response) => {
    //     setUploadResponse(`File uploaded successfully

    //     POST - superHeroName
    //     value - ${superHero}

    //     FILE - uploadFile`);
    //   })
    //   .catch((error) => {
    //     setUploadResponse(`File uploaded successfully`)
    //   });
  }, [uploadCsv, uploadFile]);

  return (
    <UploadZoneComponent
      {...{
        submitForm,
        setUploadFile
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

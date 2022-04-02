import React, { useRef } from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCheckDouble } from '@fortawesome/free-solid-svg-icons'

import * as Styled from './styled';

const UploadZone = ({ submitForm, setUploadFile, uploadFile }) => {
  const inputFileRef = useRef();
  const inputSubmitRef = useRef();

  const handleUpload = () => {
    inputFileRef.current.click();
  }

  const handleSubmit = () => {
    inputSubmitRef.current.click();
  }

  return (
    <Styled.UploadZoneContainer>
      <Styled.HiddenForm>
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder={"Superhero Name"}
          />
          <br />
          <input
            type="file"
            accept=".csv"
            ref={inputFileRef}
            onChange={(e) => setUploadFile(e.target.files[0])} />
          <br />
          <input type="submit" ref={inputSubmitRef}/>
        </form>
      </Styled.HiddenForm>
      {uploadFile?.name && (
        <Styled.ConfirmationWrapper>
          <Styled.UploadedFile>{uploadFile?.name}</Styled.UploadedFile>
          <Styled.ConfirmButton onClick={handleSubmit}>
            <FontAwesomeIcon icon={faCheckDouble} fontSize={12} />
            <Styled.IconText>
              Submit
            </Styled.IconText>
          </Styled.ConfirmButton>
        </Styled.ConfirmationWrapper>
      )}
      <Styled.UploadButton onClick={handleUpload}>
        <FontAwesomeIcon icon={faUpload} fontSize={12} />
        <Styled.IconText>
          Upload
        </Styled.IconText>
      </Styled.UploadButton>
    </Styled.UploadZoneContainer>
  )
}

UploadZone.propTypes = {
  submitForm: PropTypes.func,
  setUploadFile: PropTypes.func,
  uploadFile: PropTypes.object,
}

export default React.memo(UploadZone);

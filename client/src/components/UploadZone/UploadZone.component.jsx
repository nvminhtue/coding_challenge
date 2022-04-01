import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import * as Styled from './styled';

const UploadZone = ({ submitForm, setUploadFile }) => {
  return (
    <Styled.UploadZoneContainer>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder={"Superhero Name"}
        />
        <br />
        <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
        <br />
        <input type="submit" />
      </form>
      <hr />
      {/* <pre>{uploadResponse}</pre> */}
      <Styled.UploadedFile>Test.csv</Styled.UploadedFile>
      <Styled.UploadButton>
        <FontAwesomeIcon icon={faUpload} fontSize={12} />
        <Styled.UploadText>
          Upload
        </Styled.UploadText>
      </Styled.UploadButton>
    </Styled.UploadZoneContainer>
  )
}

export default React.memo(UploadZone);

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './styled';

const UploadZone = () => {
  return (
    <Styled.UploadZoneContainer>
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

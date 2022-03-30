const responseErrorFormatter = ({ data, status }) => {
  const extractError = data?.errors ?? {};

  return {
    errorCode: extractError.code || status.toString(),
    errorMessage: extractError.message ?? null,
  };
};

export default responseErrorFormatter;

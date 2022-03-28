interface ErrorFormat {
  data: any,
  status: number,
}
const responseErrorFormatter = ({ data, status }: ErrorFormat) => {
  const extractError = data?.error ?? {};

  return {
    errorCode: extractError.error_code || status?.toString(),
    errorDescription: extractError.error_description ?? null,
    errorExtra: extractError.error_extra ?? null,
  };
};

export default responseErrorFormatter;

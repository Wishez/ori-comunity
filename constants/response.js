const defaultResponse = {
  message: "",
  isError: false,
  isSuccess: false
};

const DEFAULT_ERROR_MESSAGE =
  "Во время выполнения оперции, возникла ошибка;(. Попробуйте сделать запрос позже.";

const handleRequest = ({ data, meta }) => {
  const { status, message } = meta;
  return status === "OK" ? { payload: data, message } : { message };
};

export { defaultResponse, DEFAULT_ERROR_MESSAGE, handleRequest };

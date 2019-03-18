
const sendResponse = (res, status, message, error) => {
  res.status(status).send({
    status,
    message: message || undefined,
    error: error || undefined,
  });
};

export { sendResponse };

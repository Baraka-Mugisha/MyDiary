const response = {
  Success(res, status, message, data) {
    return res.status(status).json({
      status: status,
      message: message,
      data: data
    })
  },
  Error(res, status, error) {
    return res.status(status).json({
      status: status,
      error: error
    })
  },
  msgError(res, status, error) {
    return res.status(status).json({
      status: status,
      message: { error: error }
    })
  },
  Message(res, status, error) {
    return res.status(status).json({
      status: status,
      message: error
    })
  }
}

export default response
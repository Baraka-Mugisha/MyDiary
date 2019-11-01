const response = {
  Validation(res, status, result) {
    const message = `${result.error.details[0].message.split('\"').join('')}`;
    if (message.indexOf('fails to match the required pattern') >= 0) {
      res.status(status).json({ status: status,
        error: `${message.split(' ')[0]} is not valid`
      })
    }
    else{
    res.status(status).json({
      status: status,
      error: `${result.error.details[0].message.split('\"').join('')}`
    })}
  }
}
export default response
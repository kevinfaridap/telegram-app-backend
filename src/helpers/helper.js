const response = (res, result, status, err) => {
    const resultPrint = {
    }
    resultPrint.status = 'Success'
    resultPrint.statusCode = status
    resultPrint.data = result
    resultPrint.error = err || null
    res.status(status).json(resultPrint)
  }
  module.exports = {
    response
  }
  
function notFound(req, res, next) {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`
  })
}

function errorHandler(err, req, res, next) {
  console.error(err.stack)

  res.status(500).json({
    message: 'Something went wrong on the EcoWise server'
  })
}

module.exports = {
  notFound,
  errorHandler
}
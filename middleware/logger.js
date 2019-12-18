module.exports = () => (req, res, next) => {
  console.log({
    method: req.method,
    url: req.url,
    timestamp: new Date().toLocaleString(),
  })
  next()
}
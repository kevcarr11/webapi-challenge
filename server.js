const express = require('express')
const cors = require("cors")
const helmet = require("helmet")
const logger = require("./middleware/logger")
const projectRouter = require("./routers/project")

const server = express()


server.use(helmet())
server.use(logger())
server.use(express.json())
server.use(cors())

server.use("/api/projects", projectRouter)

server.get("/", (req, res) => {
  res.json({
    message: "Hello World"
  })
})

server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found",
  })
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "An internal error ocurred, please try again later",
  })
})


module.exports = server
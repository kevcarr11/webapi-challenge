const express = require("express")
const projects = require("../data/helpers/projectModel")


const router = express.Router()

router.get("/", (req, res) => {
  projects.get()
  .then(projects => {
    res.status(200).json(projects)
  })
  .catch(error => {
    next(error)
  })
})

module.exports = router

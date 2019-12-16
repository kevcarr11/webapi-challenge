const projects = require("../data/helpers/projectModel")

function validateProjectId() {
  return (req, res, next) => {
    projects.get(req.params.id)
      .then(project => {
        if (project) {
          req.project = project
          next()
        } else {
          res.status(404).json({ message: "Project not found" })
        }
      })
      .catch(error => {
        console.log(error)
        next(error)
      })
  } 
}

function validateProjectData() {
  return (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({ message: "Please provide name and description for project" })
    }
    next()
  }
}

module.exports = {
  validateProjectId,
  validateProjectData,
}
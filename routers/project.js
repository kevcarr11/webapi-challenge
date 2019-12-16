const express = require("express")
const projects = require("../data/helpers/projectModel")
const { validateProjectId, validateProjectData } = require("../middleware/validate")

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

router.get("/:id", validateProjectId(), (req, res) => {
  res.json(req.project)
})

router.post("/", validateProjectData(), async (req, res) => {
  try {
    const project = await projects.insert(req.body)
    res.status(201).json(project)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", validateProjectData(), validateProjectId(), (req, res) => {
  projects.update(req.project.id, req.body)
    .then(project => {
      res.json(project)
    })
    .catch(error => {
      next(error)
    })
})

router.delete("/:id", validateProjectId(), (req, res) => {
  projects.remove(req.project.id)
    .then(() => {
      res.json({ message: "The project has been nuked" })
    })
    .catch(error => {
      next(error)
    })
})

module.exports = router

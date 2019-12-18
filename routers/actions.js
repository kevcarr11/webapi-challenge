const express = require("express")
const actions = require("../data/helpers/actionModel")
const projects = require("../data/helpers/projectModel")
const { validateActionData, validateProjectId } = require("../middleware/validate")

const router = express.Router({
  mergeParams: true,
})

router.get("/", validateProjectId(), (req, res) => {
  projects.getProjectActions(req.params.id)
    .then(actions => {
      if (actions.length > 0) {
        res.json(actions)
      } else {
        res.json({ message: "There are currently no actions for this project" })
      }
    })
    .catch(error => {
      next(error)
    })
})

router.get("/:actionId", (req, res) => {
  actions.get(req.params.actionId)
    .then(action => {
      if (action) {
        res.json(action)
      } else {
        res.status(404).json({
          message: "Action not found",
        })
      }
    })
    .catch(error => {
      next(error)
    })
})

router.post("/", validateProjectId(), async (req, res, next) => {
  if (!req.body.description || !req.body.notes) {
    return res.status(400).json({
      message: "Actions needs a description and notes value"
    })
  }
 
  const payload = {
    description: req.body.description,
    notes: req.body.notes,
    project_id: req.project.id
  }

  try {
    const action = await actions.insert(payload)
    res.status(201).json(action)
  } catch (error) {
    next(error)
  }
})

router.put("/:actionId", validateActionData(), validateProjectId(), (req, res) => {
  actions.update(req.params.actionId, req.body)
  .then(action => {
    if (action !== null) {
      res.json(action)
    } else {
      res.json({ message: "Action not found" })
    }
  })
  .catch(error => {
    next(error)
  })
})

router.delete("/:actionId", validateProjectId(), (req, res) => {
  actions.remove(req.params.actionId)
  .then(() => {
    res.json({ message: "The action has been nuked" })
  })
  .catch(error => {
    next(error)
  })
})

module.exports = router
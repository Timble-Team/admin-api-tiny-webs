// Import Swagger documentation
const express = require('express')
const router = express.Router()
const controller = require(`../controllers/agency.controller`)
const appController = require('../controllers/app.controller')


/* Enable if you want to validate */
// const validate = require('express-validation')
// const Validation = require('./documentation/agencyApi')

/* GET all agencys. */
router.get('/all', controller.indexAll)

/* GET all public agencys. */
router.get('/', controller.index)

/* Show a agency. */
router.get('/:id', controller.show)

// /* Create a agency. */
router.post('/', appController.checkSuperAdminRole, controller.new)

/* Update a agency. */
router.put('/:id', controller.handleYourSelf, controller.update)

/* Delete a agency. */
router.delete('/:id', controller.delete)

router.delete('/:id/soft', controller.softDelete)

module.exports = router

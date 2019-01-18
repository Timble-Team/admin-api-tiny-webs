// Import Swagger documentation
const express = require('express')
const router = express.Router()
const controller = require(`../controllers/user.controller`)

/* Enable if you want to validate */
// const validate = require('express-validation')
// const Validation = require('./documentation/userApi')

/* GET all users. */

router.get('/me', controller.aboutMe)

router.post('/me', controller.editMe)

router.get('/', controller.index)

/* Show a user. */
router.get('/:id', controller.show)

// /* Create a user. */
router.post('/', controller.new)

/* Update a user. */
router.put('/:id', controller.update)

/* Delete a user. */
router.delete('/:id', controller.delete)



module.exports = router

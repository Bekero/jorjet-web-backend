const express = require('express')
const {
    log
} = require('../../middlewares/logger.middleware')
const {
    getDetails,
} = require('./details.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getDetails)
// router.get('/:id', getProductById)
// router.post('/', addProduct)
// router.put('/:id', updateProduct)
// router.delete('/:id', removeProduct)

module.exports = router
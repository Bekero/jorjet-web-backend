const express = require('express')
const {
    log
} = require('../../middlewares/logger.middleware')
const {
    getRecipes,
    getRecipeById
} = require('./recipe.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getRecipes)
router.get('/:id', getRecipeById)
// router.post('/', addRecipe)
// router.put('/:id', updateRecipe)
// router.delete('/:id', removeRecipe)

module.exports = router
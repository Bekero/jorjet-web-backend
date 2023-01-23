const recipeService = require('./recipe.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getRecipes(req, res) {
    try {
        logger.debug('Getting recipes')
        let filterBy
        if (req.query.params) {
            filterBy = JSON.parse(req.query.params)
        } else {
            filterBy = {}
        }
        const recipes = await recipeService.query(filterBy)
        res.send(recipes)
        console.log('recipe.controller/ getRecipes')
    } catch (err) {
        logger.error('Failed to get recipes', err)
        res.status(500).send({
            err: 'Failed to get recipes'
        })
    }

    //     var queryParams = req.query
    //     const recipes = await recipeService.query(queryParams)
    //     res.json(recipes)
    // } catch (err) {
    //     logger.error('Failed to get recipes', err)
    //     res.status(500).send({ err: 'Failed to get recipes' })
    // }
}

// GET BY ID 
async function getRecipeById(req, res) {
    try {
        const recipeId = req.params.id
        const recipe = await recipeService.getById(recipeId)
        res.json(recipe)
    } catch (err) {
        logger.error('Failed to get recipe', err)
        res.status(500).send({
            err: 'Failed to get recipe'
        })
    }
}

module.exports = {
    getRecipes,
    getRecipeById,
}
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('recipes')
        const recipes = await collection.find(criteria).toArray()
        // const criteria = {} 
        console.log('recipe.service/ query')
        return recipes
    } catch (err) {
        logger.error('cannot find recipes', err)
        throw err
    }
}

async function getById(recipeId) {
    try {
        const collection = await dbService.getCollection('recipe')
        const recipe = await collection.findOne({
            _id: ObjectId(recipeId)
        })
        return recipe
    } catch (err) {
        logger.error(`while finding recipe ${recipeId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    // inStock = JSON.parse(inStock)
    if (filterBy.name) {
        const txtCriteria = {
            $regex: filterBy.name,
            $options: 'i'
        }
        criteria.name = txtCriteria
    }

    return criteria

}

module.exports = {
    query,
    getById
}
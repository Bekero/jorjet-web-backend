const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('products')
        const products = await collection.find(criteria).toArray()
        console.log('product.service/ query')
        // const criteria = {}  
        return products
    } catch (err) {
        logger.error('cannot find products', err)
        throw err
    }
}

async function getById(productId) {
    try {
        const collection = await dbService.getCollection('product')
        const product = await collection.findOne({
            _id: ObjectId(productId)
        })
        return product
    } catch (err) {
        logger.error(`while finding product ${productId}`, err)
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
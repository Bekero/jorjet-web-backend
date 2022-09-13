const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        console.log('criteria :', criteria)
        const collection = await dbService.getCollection('toy')
        const toys = await collection.find(criteria).toArray()
        // const criteria = {}  
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    toy.inStock = Math.random() < 0.90 ? true : false
    toy.createdAt = Date.now()
    toy.reviews = [
        {
            "_id": "u101",
            "creator": "Beker",
            "stars": "⭐⭐⭐"
        },
        {
            "_id": "u102",
            "creator": "Jarin",
            "stars": "⭐"
        },
        {
            "_id": "u103",
            "creator": "Retu",
            "stars": "⭐⭐⭐⭐⭐"
        },
    ]
    console.log('toy :', toy)
    try {
        const collection = await dbService.getCollection('toy')
        const addedToy = await collection.insertOne(toy)
        console.log('addedToy :', addedToy)
        return addedToy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: id }, { $set: { ...toy } })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    // inStock = JSON.parse(inStock)
    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.name = txtCriteria
    }
    if (filterBy.inStock) {
        if (filterBy.inStock === true)
            criteria.inStock = true
        if (filterBy.inStock === false)
            criteria.inStock = false
    }

    if (filterBy.price) {
        criteria.price = { $gt: filterBy.price - 1 }
    }

    return criteria

}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
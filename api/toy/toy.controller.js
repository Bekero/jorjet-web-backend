
const toyService = require('./toy.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getToys(req, res) {
    console.log('req.query.params :', req.query.params)
    try {
        logger.debug('Getting toys')
        let filterBy
        if (req.query.params) {
            filterBy = JSON.parse(req.query.params)
        } else {
            filterBy = {}
        }
        const toys = await toyService.query(filterBy)
        res.send(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }

    //     var queryParams = req.query
    //     const toys = await toyService.query(queryParams)
    //     res.json(toys)
    // } catch (err) {
    //     logger.error('Failed to get toys', err)
    //     res.status(500).send({ err: 'Failed to get toys' })
    // }
}

// GET BY ID 
async function getToyById(req, res) {
    try {
        const toyId = req.params.id
        const toy = await toyService.getById(toyId)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

// POST (add toy)
async function addToy(req, res) {

    try {

        const toy = req.body
        const addedToy = await toyService.add(toy)
        res.json(addedToy)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

// PUT (Update toy)
async function updateToy(req, res) {
    try {
        const toy = req.body;
        const updatedToy = await toyService.update(toy)
        res.json(updatedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })

    }
}

// DELETE (Remove toy)
async function removeToy(req, res) {
    try {
        const toyId = req.params.id;
        const removedId = await toyService.remove(toyId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
    }
}

module.exports = {
    getToys,
    getToyById,
    addToy,
    updateToy,
    removeToy
}


// const express = require('express')
// const toyService = require('../../services/toy.service')
// const router = express.Router()

// module.exports = router

// // LIST
// router.get('/', (req, res) => {
//     let filterBy = req.query.params

//     if (filterBy) filterBy = JSON.parse(filterBy)
//     toyService.query(filterBy)
//         .then(toys => res.send(toys))
//     // toyService.query(filterBy)
//     //     .then(toys => res.send(toys))
// })

// // READ
// router.get('/:toyId', (req, res) => {
//     const { toyId } = req.params
//     toyService.getById(toyId)
//         .then(toy => res.send(toy))
// })

// // CREATE
// router.post('/', (req, res) => {
//     const toy = req.body
//     console.log('toy :', toy)
//     toyService.save(toy)
//         .then(toy => res.send(toy))
// })

// // UPDATE
// router.put('/:toyId', (req, res) => {

//     const toy = req.body
//     toyService.save(toy)
//         .then(toy => res.send(toy))
//         .catch((err) => {
//             console.log('error', err)
//             res.status(400).send('Cannot update toy')
//         })
// })

// // DELETE
// router.delete('/:toyId', (req, res) => {
//     const { toyId } = req.params
//     toyService.remove(toyId)
//         .then(() => res.send({ msg: 'Removed succesfully' }))
//         .catch((err) => {
//             console.log('error', err)
//             res.status(400).send('Cannot remove toy')
//         })
// })
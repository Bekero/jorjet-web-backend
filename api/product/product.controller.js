const productService = require('./product.service');
const logger = require('../../services/logger.service')

// GET LIST
async function getProducts(req, res) {
    try {
        logger.debug('Getting products')
        let filterBy
        if (req.query.params) {
            filterBy = JSON.parse(req.query.params)
        } else {
            filterBy = {}
        }
        const products = await productService.query(filterBy)
        res.send(products)
        console.log('product.controller/ getProducts')
    } catch (err) {
        logger.error('Failed to get products', err)
        res.status(500).send({
            err: 'Failed to get products'
        })
    }

    //     var queryParams = req.query
    //     const products = await productService.query(queryParams)
    //     res.json(products)
    // } catch (err) {
    //     logger.error('Failed to get products', err)
    //     res.status(500).send({ err: 'Failed to get products' })
    // }
}

// GET BY ID 
async function getProductById(req, res) {
    try {
        const productId = req.params.id
        const product = await productService.getById(productId)
        res.json(product)
    } catch (err) {
        logger.error('Failed to get product', err)
        res.status(500).send({
            err: 'Failed to get product'
        })
    }
}

module.exports = {
    getProducts,
    getProductById,
}


// const express = require('express')
// const productService = require('../../services/product.service')
// const router = express.Router()

// module.exports = router

// // LIST
// router.get('/', (req, res) => {
//     let filterBy = req.query.params

//     if (filterBy) filterBy = JSON.parse(filterBy)
//     productService.query(filterBy)
//         .then(products => res.send(products))
//     // productService.query(filterBy)
//     //     .then(products => res.send(products))
// })

// // READ
// router.get('/:ProductId', (req, res) => {
//     const { ProductId } = req.params
//     productService.getById(ProductId)
//         .then(product => res.send(product))
// })

// // CREATE
// router.post('/', (req, res) => {
//     const product = req.body
//     console.log('product :', product)
//     productService.save(product)
//         .then(product => res.send(product))
// })

// // UPDATE
// router.put('/:ProductId', (req, res) => {

//     const product = req.body
//     productService.save(product)
//         .then(product => res.send(product))
//         .catch((err) => {
//             console.log('error', err)
//             res.status(400).send('Cannot update product')
//         })
// })

// // DELETE
// router.delete('/:ProductId', (req, res) => {
//     const { ProductId } = req.params
//     productService.remove(ProductId)
//         .then(() => res.send({ msg: 'Removed succesfully' }))
//         .catch((err) => {
//             console.log('error', err)
//             res.status(400).send('Cannot remove product')
//         })
// })
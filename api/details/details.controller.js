const detailService = require('./details.service');
const logger = require('../../services/logger.service')

// GET LIST
async function getDetails(req, res) {
    try {
        logger.debug('Getting details')
        let filterBy
        if (req.query.params) {
            filterBy = JSON.parse(req.query.params)
        } else {
            filterBy = {}
        }
        const details = await detailService.query(filterBy)
        res.send(details)
        console.log('detail.controller/ getdetails')
    } catch (err) {
        logger.error('Failed to get details', err)
        res.status(500).send({
            err: 'Failed to get details'
        })
    }

    //     var queryParams = req.query
    //     const details = await detailService.query(queryParams)
    //     res.json(details)
    // } catch (err) {
    //     logger.error('Failed to get details', err)
    //     res.status(500).send({ err: 'Failed to get details' })
    // }
}

module.exports = {
    getDetails,
}


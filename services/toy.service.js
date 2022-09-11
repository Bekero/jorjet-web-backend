
const fs = require('fs')
var gToys = require('../data/toy.json')
const PAGE_SIZE = 5

module.exports = {
    query,
    getById,
    save,
    remove
}

function query(filterBy = { name: '', price: '' }) {
    filterBy.price = filterBy.price || Infinity

    const regex = new RegExp(filterBy.name, 'i')
    var toys = gToys.filter(toy => regex.test(toy.name) && toy.price < filterBy.price)

    return Promise.resolve(toys)
}

function getById(toyId) {
    const toy = gToys.find(toy => toy._id === toyId)
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = gToys.findIndex(toy => toy._id === toyId)
    gToys.splice(idx, 1)

    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        let toyToUpdate = gToys.find(currToy => currToy._id === toy._id)
        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
    } else {
        toy._id = _makeId()
        toy.createdAt = Date.now()
        toy.inStock = Math.random() < 0.5;
        console.log('ToyWithout ID! :', toy)
        gToys.push(toy)
    }
    return _saveToysToFile()
        .then(() => console.log('Toy After Save :', toy))
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gToys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return reject('Cannot save to file')
            resolve()
        })
    })
}

function _makeId(length = 5) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
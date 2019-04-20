const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const bookmarks = require('../bookmarks')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
.route('/bookmarks')
.get((req, res)=> {
    res.json(bookmarks)
})
.post(bodyParser, (req, res)=> {
    const {title, url, description, rating} = req.body
    const id = uuid(); 
    if(!title || !url || !description || !rating){
        logger.error(`User submitted invalid data`)
        res
        .status(400)
        .send('Invalid data')
    }
    const bookmark = {title, url, description, rating, id}
    bookmarks.push(bookmark); 
    logger.info(`Bookmark with ${id} was created`)
    res
    .status(201)
    .location(`http://localhost:8000/bookmarks/${id}`)
    .json(bookmark)
})

bookmarksRouter
.route('/bookmarks/:id')
.get((req, res) => {
    const {id} = req.params
    const bookmark = bookmarks.find(bookmark => bookmark.id == id); 
    if(!bookmark){
        logger.error(`bookmark with ${id} not found`)
        return res
        .status(404)
        .send({error: '404 not found'})
    }
    res.json(bookmark)
})
.delete((req, res)=> {
    const {id} = req.params; 
    const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == id); 
    if(bookmarkIndex === -1){
        logger.error(`Failed attempt to delete, bookmark with id ${id} not found`)
        return res
        .status(404)
        .send({error: 'invalid entry'})
    }
    const bookmarksList = bookmarks.filter(bookmark => bookmark.id !== id);

    res.json(bookmarksList)
})








module.exports = bookmarksRouter
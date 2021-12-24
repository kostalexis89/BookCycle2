const router = require('express').Router()
const Book = require('../models/Book.model')
const userEditAccess = require("../middleware/userEditAccess");
const User = require('../models/User.model')
const Request = require ('../models/Request.model')
//create a book 
router.post('/add', (req, res, next) => {
    const {title, description, author, image, language,town, purpose, available, user, isbn} = req.body
    console.log(description)
   
    Book.find({$and : [{user: user}, {isbn:isbn}]})
    .then(response=> {
        if(response.length===0){
            Book.create({title, description, author, image, language,town, purpose, available, user, isbn})
    .then(book => {
        res.status(201).json(book)
    })
    .catch(err => next(err))
        } else {
            res.status(200).json({ message: 'Book is already entered' })
        }
    })



    
})

router.post('/mycollection', (req, res, next) => {
    console.log('I am searching')
    const {userId, purpose} = req.body
    console.log('This is ' + userId)
    Book.find({
        user: userId,
        purpose: purpose
    }).populate('user')
    .then(response => {
        console.log(response)
        console.log(purpose)
        res.status(200).json(response)
    })
})

router.post('/delete/:id',userEditAccess, (req,res,next) => {
    


    Book.findByIdAndDelete(req.params.id)
    .then(()=> {
        res.status(200).json({ message: 'Book deleted from my Collection' })
    })

})

router.post('/edit/:id',userEditAccess, (req, res, next) => {
    const {purpose} = req.body
    console.log(req.body)
    console.log('I am trying to edit now')
    const id = req.params.id
    console.log(id)
    Book.findByIdAndUpdate(id, {
        purpose: purpose
    }, {new: true})
    .then(updatedBook => {
        res.status(200).json(updatedBook)
    })
    .catch(err => next(err))

})

router.post('/town', (req, res, next) => {
    const {town, user} = req.body
    // console.log(user)
    Book.find({$and: [{town:town}, {user: {$ne:user}}]}).populate('user')
    .then(response => {
        res.status(200).json(response)
    })
})

router.post('/byPurpose', (req, res, next) => {
    const {town, user, purpose} = req.body
    Book.find({$and: [{town:town}, {purpose: purpose}, {user: {$ne:user}}]}).populate('user')
    .then(response => {
        res.status(200).json(response)
    })
})


router.post('/getbooklist', (req, res, next) => {
    console.log(req.body)
    const {requestId } = req.body
    console.log(requestId)
    Book.find({$and: [{user:requestId}, {available: true}]})
    .then(response => {
        // console.log(response)
        res.status(200).json(response)
    })
    .catch(err=> console.log(err))
})
// router.post('/sendRequest', (req, res, next) => {
//     const {userId, ownerId, message, bookId} = req.body
//     console.log('user ID', userId)
//     console.log('owner ID',ownerId)
//     Request.create({sender: userId, reciever:ownerId, message, book:bookId})
//     .then(request => {
//         res.status(201).json(request)
//     })
//     .catch(err => next(err))
// })

// router.post('/outbox', (req, res, next) => {
//     const {sender} = req.body
//     console.log(sender)
//     Request.find({sender: sender}).populate('book').populate('reciever').populate('sender')
//     .then(request => {
//         res.status(201).json(request)
//     })
//     .catch(err => next(err))
// })

module.exports = router
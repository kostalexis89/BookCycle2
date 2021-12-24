const router = require('express').Router()
const Book = require('../models/Book.model')
// const userEditAccess = require("../middleware/userEditAccess");
const User = require('../models/User.model')
const Request = require ('../models/Request.model')
const { request } = require('express')


router.post('/sendRequest', (req, res, next) => {
    const {userId, ownerId, message, bookId} = req.body
    console.log('user ID', userId)
    console.log('owner ID',ownerId)

    Request.find({$and : [{sender: userId}, {reciever:ownerId}, {book:bookId}]})
    .then(request=>{
        // console.log(request)
        if(request.length===0){
            Request.create({sender: userId, reciever:ownerId, message, book:bookId})
            .then(request => {
                res.status(201).json(request)
            })
            .catch(err => next(err))
        }
    })
   
})

router.post('/outbox', (req, res, next) => {
    const {sender} = req.body
    console.log(sender)
    Request.find({sender: sender}).populate('book').populate('reciever').populate('sender').populate('proposal')
    .then(request => {
        res.status(201).json(request)
    })
    .catch(err => next(err))
})

router.post('/inbox', (req, res, next) => {
    const {reciever} = req.body
    console.log("This is the reciever",reciever)
    Request.find({reciever: reciever}).populate('book').populate('reciever').populate('sender')
    .then(request => {
        res.status(201).json(request)
    })
    .catch(err => next(err))
})

router.post('/send', (req, res, next) => {
    const {message, requestId} = req.body
    console.log(message)
    console.log(requestId)
    Request.findOneAndUpdate(
        { _id: requestId }, 
        { $push: { message: message  } },
       function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
             }
         });    
})

router.post('/cancel', (req,res,next) => {
    const {requestId} = req.body
    Request.findByIdAndDelete(requestId)
    .then(()=> {
        res.status(200).json({ message: 'Request Got Cancelled' })
    })
})

router.post('/requestexchange', (req, res, next) => {
    const {bookId, requestId} = req.body
    
    console.log("bookId", bookId)
    console.log("requestId", requestId)
    Request.findByIdAndUpdate(requestId, {
        proposal: bookId, agreed:0
    }, {new: true})
    .then(updatedBook => {
        res.status(200).json(updatedBook)
    })
    .catch(err => next(err))  
})

router.post('/agree', (req,res,next) => {
    const {userId, requestId,userType} = req.body
    console.log(userType)
    // if(userType==="Receiver") {

    // }
    // Request.findById(requestId)
    // .then(response=>{
    //     // console.log(response.agreed)
    //     Request.findByIdAndUpdate(requestId, {
    //         agreed:response.agreed+1
    //    }, {new: true}).populate('proposal')
    //    .then(request => {
    //     if(request.agreed>=1){
    //         res.status(200).json(request)
    //         console.log(request.proposal._id)
    //         Book.findByIdAndUpdate(request.proposal._id, {available:false}, {new: true})
    //         .then(updatedBook => {
    //             res.status(200).json(updatedBook)
    //         })
    //         .catch(err => next(err)) 
    //     }
           
           
    //    })
    //    .catch(err => next(err))  
    // })
    
})

module.exports = router
module.exports = (req, res, next) => {
    // this middleware checks if the loggedInUser has created the viewed event
    const {userId, bookOwner} = req.body
    console.log(bookOwner)
    console.log(userId)
    if(bookOwner===userId) {
        next()
    } else {
        console.log('NO WAY MR HACKER')
    }
};
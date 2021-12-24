const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middleware/jwt.js')

const saltRounds =10
//signup
router.post('/signup', (req, res, next) => {
    //we can take from the req.body, e mail, password, name and town
    //Lets check at a later point what is happening when the user will not define a picture
    const {email, username, password, town, picture} = req.body

    //VALIDATIONS

    if (email === '' || password === '' || username === '' || town === '') {
		res.status(400).json({ message: "Provide email, password, username, and town" });
		return;
	}

	// Use regex to validate the email format
	const emailValid = email.includes('@')
	if (!emailValid) {
		res.status(400).json({ message: 'Provide a valid email address.' });
		return;
	}

	// Use regex to validate the password format
	if (password.length < 4) {
		res.status(400).json({ message: 'Password must have at least 4 characters and contain at least one number, one lowercase and one uppercase letter.' });
		return;
	}

    //we have to hash the password after we create the user.
    //check if user already exists
    User.findOne({email})
    .then(foundedUser => {
        if(foundedUser) {
            res.status(400).json({ message: 'A User with this email address already exists' });
            return
        }
         //Now email is unique --> we has the password and create the user!
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt);

        return User.create({email, username, password: hash, town, picture})
        .then(createdUser => {
            //now we gonna send the user object as a response, but i wont send the password
            const {email, username, town, picture, _id} = createdUser
            const user = {email, username, town, picture, _id}
            //now send a json response with the created user that doesnt contain the password
            res.status(201).json({user: user})
        })
        .catch(err => {
			console.log(err);
			res.status(500).json({ message: "Internal Server Error" })
		});
    })
   
})


//so when the user is logging in it gets as a response a JSON object
//with authToken which we will later store in the database
router.post('/login', (req, res, next) => {
    //distructure emai, password
    const { email, password } = req.body

	// Check if email or password or name are provided as empty string 
	if (email === '' || password === '') {
		res.status(400).json({ message: "Provide email and password" });
		return;
	}

    User.findOne({email})
    .then(foundUser => {
        if(!foundUser) {
            res.status(400).json({ message: "User not found" });
		return;
        }
        const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
        if(passwordCorrect) {
            const {_id, username, email, town, picture} = foundUser
            const payload = {_id, username, email, town, picture}

            //create the json web token
            //this is the auth Token that I store in the localStorage  
            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: '12h' }
            )
            res.status(200).json({ authToken: authToken }) 
        }
        else {
            res.status(401).json({ message: "Unable to authenticate user" });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    })
})

//we verify the token every time the user opens the tab or logges in
router.get('/verify', isAuthenticated, (req, res, next) => {
	// if the token is valid we can access it on : req.payload
	// console.log('request payload: ', req.payload)
	res.status(200).json(req.payload)
});

module.exports = router
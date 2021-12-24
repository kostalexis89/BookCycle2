import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const navigate = useNavigate()
	//a method it login the user
	//this is a fucking function!
	const loginUser = token => {
		// store this token in local storage
		localStorage.setItem('authToken', token)
		verifyStoredToken();
	}

	const logoutUser = () => {
		//first we have to remove the token from the local storage
		localStorage.removeItem('authToken')
		//then we have to reset the state!
		setIsLoggedIn(false)
		//the last step
		setUser(null)
		navigate("/")
	}

	const verifyStoredToken = () => {
		// check local storage for an auth token
		const storedToken = localStorage.getItem('authToken')
		if (storedToken) {
			axios.get('/auth/verify', { headers: { Authorization: `Bearer ${storedToken}` } })
				.then(response => {
					// console.log(response)
					const user = response.data
					setUser(user)
					setIsLoggedIn(true)
					setIsLoading(false)
				})
				.catch(err => {
					// the token is invalid
					setIsLoggedIn(false)
					setUser(null)
					setIsLoading(false)
				})
		} else {
			// token is not available
			setIsLoading(false)
		}
	}

	useEffect(() => {
		verifyStoredToken()
	}, [])
   
	return (
		<AuthContext.Provider value={{ isLoggedIn, user, isLoading, loginUser, logoutUser }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export { AuthProviderWrapper, AuthContext }
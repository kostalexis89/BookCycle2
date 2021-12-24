import React, { useState, useEffect } from 'react'
import capitalsCities from '../../capitals.json'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function SignUp({handleLogin}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [town, setTown] = useState('')
    const [findedTowns, setFindedTowns] = useState([])

    const [errorMessage, setErrorMessage] = useState(undefined)

    // const navigate = useNavigate()
    //Forms Handlerers
    const handleName = e => setUsername(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    //Town Handler
    const handleTown = e => {
		setTown(e.target.value)
	}
    useEffect(() => {
		let results = []
		capitalsCities.data.map((e)=>{
		if(e.capital.toLowerCase().includes(town.toLowerCase())){
			results.unshift(e.capital +", "+e.name)
		}
		
		return true
		})
		if(town.length===0){
			results = []
		}
		results = results.slice(0, 5);
		setFindedTowns(results)
		
	}, [town])
    const handleDropTown = e => setTown(e.target.innerHTML)

    const handleSubmit = (e) => {
        e.preventDefault()
        const requestBody = { email, password, username, town }

		axios.post('/auth/signup', requestBody)
			.then(response => {
				// navigate('/login')
			})
			.catch(err => {
				const errorDescrition = err.response.data.message
				setErrorMessage(errorDescrition)
			})
    }
  return (
    <>
      <h1 className="heading-one">Sign Up to BookCycle</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-inputs">
          <label>Username</label>
          <input
            type="text"
            placeholder="email"
            value={username}
            onChange={handleName}
          />
          <label>Email address</label>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={handleEmail}
          />
          <label>password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePassword}
          />
          <label>Town</label>
          <input
            type="text"
            placeholder="town"
            value={town}
            onChange={handleTown}
          />
          <div className="drop-towns">{findedTowns.map((town, index) => {
					return <div key={index} className='child-towns' onClick={handleDropTown}>{town}</div>
				})}</div>
        </div>

        <button type="submit" id="submitBtn" className="btna btn-white">
          {" "}
          Sign Up
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <div className="form-inputs extra-margin">
        <label>Do you already have an account ?</label>
        <button className="btna btn-white" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </>
  );
}

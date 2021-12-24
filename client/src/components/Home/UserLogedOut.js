import React, { useState} from 'react'
import Login from './Login'
import SignUp from './SignUp'
import { useTransition, animated } from 'react-spring'
import useWindowDimensions from '../../hooks/useWindowDimensions';


export default function UserLogedOut() {
  const [startVisible, setStartVisible] = useState(true)
  const [loginVisible, setLoginVisible] = useState(false)
  const [signUpVisible, setSignUpVisible] = useState (false)
  
  //making responsive the animations of spring
  const { height, width } = useWindowDimensions();
  console.log(width)
  let moveX300 =0
  if(width <768){
    moveX300 = 0
  }else {
    moveX300 = width*300/1920
  }
  


  
  console.log('thats me',moveX300)
  const transitionStartingItem = useTransition(startVisible, {
    // leave: {x:0, y:0, opacity:0.5}
    from: {opacity:1},
    enter:{opacity:1},
    leave: {opacity:0},
  });

 
  const transitionLoginItem = useTransition(loginVisible, {
    // leave: {x:0, y:0, opacity:0.5}
    from: {opacity:0,x:-moveX300},
    enter:{opacity:1},
    leave: {opacity:0,x:moveX300},
    
  });
 
console.log('lalala')
  
  const transitionSignUpItem = useTransition(signUpVisible, {
    // leave: {x:0, y:0, opacity:0.5}
    from: {opacity:0,x:-moveX300},
    enter:{opacity:1},
    leave: {opacity:0,x:moveX300},
    
  });

  const handleLogin = () => {
    setTimeout(()=>setLoginVisible(true), 1000);
    
    setStartVisible(false)
    setSignUpVisible(false)
    console.log('i am handling')
  }

  
  const handleSignUp = () => {
    setStartVisible(false)
    setTimeout(()=>setSignUpVisible(true), 1000);
    
    setLoginVisible(false)
    console.log('i am handling')
  }

    return (
        <header className='flx'>
        {transitionStartingItem((style,item)=>
        item && 
        <animated.div style={style}>
           <h1 className="heading-primary">
             <span className="heading-primary-main">BookCycle</span>
             <span className="heading-primary-sub">Trade your Books</span>
           </h1>
           <div className="front-btns">
             <div className="btna btn-white" onClick={handleLogin}>Log In</div>
             <div className="btna btn-white" onClick={handleSignUp}>Sign Up</div>
           </div>
        </animated.div>)}
        <div>
        {transitionSignUpItem((style,item)=>
        item &&
        <animated.div style={style}>
          <SignUp handleLogin={handleLogin}/>
        </animated.div>
        )}
      </div>
        <div>
        {transitionLoginItem((style,item)=>
        item &&
        <animated.div style={style}>
          <Login handleSignUp={handleSignUp}/>
        </animated.div>
        )}
        </div>
        
      

        </header>
    )
}

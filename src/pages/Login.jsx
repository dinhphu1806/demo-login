import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './login.css';
import { toast } from 'react-toastify';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';

// login google
import { GoogleAuthProvider,  signInWithPopup } from "firebase/auth";

import Loading from '../components/Loading/Loading';
const Login = (props) => {

  const navigate = useNavigate()

  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ isRemember, setIsRemember ] = useState(false)
  const [ error, setError] = useState('');
  const [ loading, setLoading] = useState(false)

  
  // handle login
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log({email, password, isRemember});
    setLoading(true)
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      console.log(user)
      setLoading(false) 
      // toast.success('Successfully logged in')
      // alert("Login successfully")
      toast.success("Login successfully ")
      navigate('/')
     
    } catch(error) {
      setLoading(false) // setLoading err
      // console.log(error.message);
      toast.error(error.message)
      // toast.error(error.message) // toast error
    }
  //   signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // // Signed in 
  //   const user = userCredential.user;
  //   console.log(user);
  //   setLoading(false);
  //   alert("Login succesfully")
  //   navigate("/")
  //   // ...
  // })
  // .catch((error) => {
  //   setError(error.message)
  //   // setLoading(false)
  //   // console.log(error.message);
  // });
  }

  // handle login google
  const provider = new GoogleAuthProvider();
  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert("Successfully")
      navigate('/')
    }).catch((error) => {
      setError(error.message)
      // console.log(error.message);
    });

  }

  const styleInput = {
    width: '50%'
  }
  return (
    <div className='login'>
      {loading ? <Loading /> : (
        <div className="login__container">
        <h1>Login Form</h1>
        <form action="form" onSubmit={handleSubmitLogin}>
          <div className="form__field" style={{textAlign: 'center'}}>
            <label htmlFor="email" >Email</label>
            <input type='email' id='email' placeholder='Email'  value={email} onChange={e => setEmail(e.target.value)} style={styleInput} />
          </div>
          <div className="form__field" style={{textAlign: 'center'}}>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} style={styleInput}/>
          </div>
          <div className='form__field' style={{textAlign: 'center'}}>
            <input type="checkbox" id='checkbox' onClick={() => setIsRemember(!isRemember)}/>
            <label htmlFor="checkbox">Remeber me</label>
          </div>
          <button type='submit' style={{textAlign: 'center'}}>Login</button>
          <div className="flex" style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
            <span style={{width: '100%', height: '1px', backgroundColor: '#000'}}></span>
            <span style={{width:'100%', display: 'flex', justifyContent:'center'}}>or login with</span>
            <span style={{width: '100%', height: '1px', backgroundColor: '#000'}}></span>
          </div>

          <div className="form__link">
            <a href="">Facebook</a>
            <button onClick={handleLoginWithGoogle}>Google</button>
          </div>
        
        </form>
        {error && <span className='error-msg'>{error}</span>}
        <div className="flex" style={{display:'flex', alignItems: 'center'}}>
            <p>Do not have an account</p>
            <NavLink to='/register'>Register here</NavLink>
          </div>
      </div>
      )}
      
    </div>
  )
}

export default Login
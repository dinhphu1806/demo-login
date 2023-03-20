import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './login.css';
import { toast } from 'react-toastify';

// 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase.config';
import Loading from '../components/Loading/Loading';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {

  const [ username, setUsername] = useState('')
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ cPassword, setCPassword] = useState('')
  const [file, setFile] = useState(null);
  const [ error, setError ] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  
  const handleSubmitRegister = async (e) => {
   
    setLoading(true)
    e.preventDefault();
    console.log({email, password, cPassword});
    if(password !== cPassword) {
      // alert('Do not match password !')
      toast.error('Do not match password !')
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // await get user credential
      const user = userCredential.user;
      // console.log(user);
         // download leen store
      const storageRef = ref(storage, `images/${ Date.now() + username}`)
         // download to store
      const uploadTask = uploadBytesResumable(storageRef, file)

      // upload error 
      uploadTask.on((error) => {
        console.log(error.message);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        // update username
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });
           // store user data in 
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: username,
          email,
          photoURL: downloadURL
        }) 
        })
      })

      setLoading(false)
      // alert("Acount created successfully")
      toast.success("Account created successfully")
      navigate('/login')

    } catch (error) {
      setLoading(false)
      // console.log(error.message);
      toast.error(error.message)
    }
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log(user);
    //     setLoading(false)
    //     alert("Create user successfully")
    //     navigate('/login')
    //     // ...
    //   })
    //   .catch((error) => {
    //     setLoading(false)
    //     console.log(error.message);
    //   });
  }

  const styleInput = {
    width: '50%'
  }
  return (
    <div className='register'>
      {loading ? <Loading /> : ( <div className="register__container">
        <h1>Register Form</h1>
        <form action="form" onSubmit={handleSubmitRegister}>
          <div className="form__field" style={{textAlign: 'center'}}>
            <label htmlFor="username" >Username</label>
            <input type='text' id='username' placeholder='username' autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} style={styleInput} />
          </div>
          <div className="form__field" style={{textAlign: 'center'}}>
            <label htmlFor="email" >Email</label>
            <input type='email' id='email' placeholder='Email' autoComplete='off'  value={email} onChange={e => setEmail(e.target.value)} style={styleInput} />
          </div>
          <div className="form__field" style={{textAlign: 'center'}}>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} style={styleInput}/>
          </div>
          <div className="form__field" style={{textAlign: 'center'}}>
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" id='cpassword' placeholder='Confirm Password' value={cPassword} onChange={e => setCPassword(e.target.value)} style={styleInput}/>
          </div>
          <div className="form__field" style={{textAlign: 'center'}}>
            <input 
                type="file" 
                id="file"  
                onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button type='submit' style={{textAlign: 'center'}}>Register</button> 
        </form>
        {error && <span className='error-msg'>{error}</span>}
        <div className="flex" style={{display:'flex', alignItems: 'center'}}>
              <NavLink to='/login'>Login here</NavLink>
          </div>
      </div>)}
     
    </div>
  )
}

export default Register
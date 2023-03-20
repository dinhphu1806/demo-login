import { useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';

// redux
import { addLoginGoogle } from '../../redux/slice/authenSlice';
import { useSelector, useDispatch } from 'react-redux';

const useAuth = () => {

  const [ currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setCurrentUser(user)
      }else{
        setCurrentUser(null)
      }
    })
  })

  return (
   currentUser
  )
}

export default useAuth
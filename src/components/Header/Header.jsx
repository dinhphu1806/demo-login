import React, { useEffect, useState } from 'react';
import './header.css';

// redux
import { addLoginGoogle } from '../../redux/slice/authenSlice';
import { useSelector, useDispatch } from 'react-redux';
import { menuItem } from './menuItem';
import { NavLink, useNavigate } from 'react-router-dom';
// sign out
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

// auth change
import { onAuthStateChanged } from 'firebase/auth';


const Header = () => {
    const dispatch = useDispatch()
    const { loginGoogle } = useSelector(state => state.authen)
    const navigate = useNavigate()
  const handleLogOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        alert("Logout succesfully")
        navigate("/")
      }).catch((error) => {
        // toast.error("error.message")
        console.log(error.message);
    });
  }

  // auth change
  const [ displayName, setDisplayName ] = useState('')
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(user.displayName);

          dispatch(addLoginGoogle(user.displayName))
          
          setDisplayName(loginGoogle)
        //   setDisplayName(user.displayName)
          // ...
        } else {
          // User is signed out
        //   alert(error.message)
         setDisplayName('')
          // ...
        }
      });
  })
    

  return (
    <div className='header'>
        <div className="header__container">
            <NavLink to='/' className="header__logo">
                Logo
            </NavLink>

            {/* nav */}
            <ul className="header__nav">
                {menuItem.map(item => {
                    return(
                        <li key={item.id}>
                            <NavLink to={item.path}>
                                {item.name}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>

            {/* icon */}
            <div className="header__icon">
                {displayName ? '' : (<NavLink to='/login'>
                    Login
                </NavLink>)}

                {displayName ? `Hi, ${displayName}` : ""}

                <NavLink to='' onClick={handleLogOut}>
                    {displayName ? 'Logout' : ''}
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Header
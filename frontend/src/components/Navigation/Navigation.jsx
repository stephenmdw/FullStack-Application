import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import './Navigation.css';
import { useState } from 'react';
import PinFormModal from '../PinFormModal';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className="session-links">
        <LoginFormModal 
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          setShowSignUpModal={setShowSignUpModal}/>
        <SignUpFormModal 
          showSignUpModal={showSignUpModal} 
          setShowSignUpModal={setShowSignUpModal}
          setShowLoginModal={setShowLoginModal} />
      </div>
    );
  }

  return (
    <div className='navbar'>
      <div className='left-side'>
      <NavLink className="home-link" exact to="/">
        <div className={sessionUser ? "small-home-button" : "home-button"}></div>
      </NavLink>

      {sessionUser ? <PinFormModal/> : ""}
      </div>

      {sessionLinks}

    </div>
  );
}

export default Navigation;



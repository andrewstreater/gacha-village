import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import gvlettermark from '../../../public/favicon.png'
import gvwordmark from '../../../public/gacha-village-wordmark-white.png'

function Navigation() {
  const navigate = useNavigate()
  const sessionUser = useSelector((store) => store.session.user);

  return (
    <div className="navigation-bar">

        <div>
          <img className="gvlettermark navbutton" src={gvlettermark} onClick={() => navigate('/')}></img>
          <img className="gvwordmark navbutton" src={gvwordmark} onClick={() => navigate('/')}></img>
        </div>
        <div className="top-nav-buttons">
          {sessionUser ? (<>
          <div className='nav-button' onClick={() => navigate('/items/current')}>My Items</div>
          <div className='nav-button' onClick={() => navigate('/lists/current')}>My Lists</div>
          <div className='nav-button' onClick={() => navigate('/items/new')}>Post an item</div>
          <div className='nav-button' onClick={() => navigate('/lists/new')}>Create new list</div>
          </>):(<>
          </>)}

          <div className="profile-button navbutton">
            <ProfileButton />
          </div>
        </div>

    </div>
  );
}

export default Navigation;

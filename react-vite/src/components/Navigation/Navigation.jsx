import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
          {/* <NavLink to="/">Home</NavLink> */}
          <img className="gvlettermark" src={gvlettermark} onClick={() => navigate('/')}></img>
          <img className="gvwordmark" src={gvwordmark} onClick={() => navigate('/')}></img>
        </div>
        {sessionUser ? (<>
        <button className='nav-button' onClick={() => navigate('/items/current')}>My Items</button>
        <button className='nav-button' onClick={() => navigate('/lists/current')}>My Lists</button>
        <button className='nav-button' onClick={() => navigate('/items/new')}>Post an item</button>
        <button className='nav-button' onClick={() => navigate('/lists/new')}>Create new list</button>
        </>):(<>
        </>)}

        <div className="profile-button">
          <ProfileButton />
        </div>

    </div>
  );
}

export default Navigation;

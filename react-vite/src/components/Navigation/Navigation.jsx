import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import steve from '../../../icons/steve.jpeg'

function Navigation() {
  const navigate = useNavigate()
  const sessionUser = useSelector((store) => store.session.user);
  return (
    <div className="navigation-bar">

        <div>
          {/* <NavLink to="/">Home</NavLink> */}
          <img className="steve" src={steve} onClick={() => navigate('/')}></img>
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

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import letterMark from '../../../public/favicon.png'
import wordMark from '../../../public/gacha-village-wordmark-white.png'
import bgImage from '../../../public/vita2.jpeg'
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }



    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );
    console.log(serverResponse)
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
        <div className="flex-center-child">
          <div className="sign-up-form-page">
          <img id="sign-up-form-bg-image" src={bgImage}></img>
          <img id="splash-wordMark" src={wordMark}></img>
          <img id="splash-letterMark" src={letterMark}></img>
          <h1>Sign Up</h1>
          {errors.server && <p className="error">{errors.server}</p>}
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                placeholder="email"
                className="margin-4px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {errors.email && <p className="error">{errors.email}</p>}
            <label>
              <input
                type="text"
                placeholder="username"
                className="margin-4px"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            {errors.username && <p className="error">{errors.username}</p>}
            <label>
              <input
                type="password"
                placeholder="password"
                className="margin-4px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {errors.password && <p className="error">{errors.password}</p>}
            <label>
              <input
                type="password"
                placeholder="confirm password"
                className="margin-4px"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            <button className="margin-4px login-signup-buttons" type="submit">Sign Up</button>
            <div className="margin-4px back-to-login" onClick={() => navigate('/login')}>Go back to login</div>
            {/* <button className="margin-4px login-signup-buttons" onClick={() => navigate('/login')}>Log in</button> */}
          </form>
          </div>
        </div>
    </>
  );
}

export default SignupFormPage;

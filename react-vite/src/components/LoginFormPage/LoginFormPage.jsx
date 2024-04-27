import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import letterMark from '../../../public/favicon.png'
import wordMark from '../../../public/gacha-village-wordmark-white.png'
import bgImage from '../../../public/vita.jpeg'

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const loginDemoUser = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
        thunkLogin({
            email: 'demo@gmail.com',
            password: 'password'
        })
    )
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <div id="landing-page">
        <div id="login-form-page">
          <img id="splash-letterMark" src={letterMark}></img>
          <h1>Welcome to</h1>
          <img id="splash-wordMark" src={wordMark}></img>
          <h2>Log In</h2>
          {errors.length > 0 &&
            errors.map((message) => <p key={message}>{message}</p>)}
          <form id='login-page-form' onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                placeholder="email"
                className="margin-4px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {errors.email && <p className="error">{errors.email}</p>}
            <label>
              <input
                type="password"
                placeholder="password"
                className="margin-4px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.password && <p className="error" >{errors.password}</p>}
            <button className="margin-4px login-signup-buttons" type="submit">Log In</button>
            <button className="margin-4px login-signup-buttons" onClick={loginDemoUser}>Log In as Demo User</button>
            <div className="margin-4px" >Don&apos;t have an account?</div>
            <button className="margin-4px login-signup-buttons" onClick={() => navigate('/signup')}>Sign up</button>
          </form>
        </div>
        <div id="splash-page">
            <img id="splash-image" src={bgImage}></img>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;

import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

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
      <div id="login-form-page">
        <h1>Log In</h1>
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}
        <form id='login-form' onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
          <label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          <button type="submit">Log In</button>
          <button id='demo-login-button' onClick={loginDemoUser}>Log In as Demo User</button>
          <div>Don&apos;t have an account?</div>
          <button onClick={() => navigate('/signup')}>Sign up</button>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;

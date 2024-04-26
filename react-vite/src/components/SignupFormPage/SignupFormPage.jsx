import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
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
        <div className="sign-up-form-page">
        <h1>Sign Up</h1>
        {errors.server && <p className="error">{errors.server}</p>}
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}
          <label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          {errors.username && <p className="error">{errors.username}</p>}
          <label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {errors.password && <p className="error">{errors.password}</p>}
          <label>
            <input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          <button type="submit">Sign Up</button>
          <div>Go back to login</div>
          <button onClick={() => navigate('/login')}>Log in</button>
        </form>
        </div>
    </>
  );
}

export default SignupFormPage;

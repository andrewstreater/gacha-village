import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
      closeModal();
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
      closeModal();
    }
  }

  return (
    <>
      <div id="login-modal">
        <h1>Log In</h1>
        <form id='login-form' onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              className="login-field"
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
              className="login-field"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          <button id='login-button' type="submit">Log In</button>
          <button id='demo-login-button' onClick={loginDemoUser}>Log In as Demo User</button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;

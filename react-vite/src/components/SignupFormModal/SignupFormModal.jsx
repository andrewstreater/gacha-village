import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
    <div className="sign-up-form-modal">
      <h1>Sign Up</h1>
      {errors.server && <div className="error">{errors.server}</div>}
      <form onSubmit={handleSubmit} className="sign-up-form">
      <div className="error-spacer">{errors.email && <div className="error">{errors.email}</div>}</div>
        <label>
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="error-spacer">{errors.username && <div className="error">{errors.username}</div>}</div>
        <label>
          <input
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div className="error-spacer">{errors.password && <div className="error">{errors.password}</div>}</div>
        <label>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        <label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="signup-submit-button" type="submit">Sign Up</button>
      </form>
      </div>
    </>
  );
}

export default SignupFormModal;

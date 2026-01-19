import { useState } from "react";
import { useAuth } from "./useAuth";
import "./SignUpPopup.css";

function SignUpForm({ finishSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const { signUp } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    if(!isFormValid) return;
    setLoading(true);
    setMessage(null)

    const { error } = await signUp(firstName, lastName, email, password);

    setLoading(false);

    if (error) {
        setError(error.message);
        return;
    }

    setMessage("Account created! Please check email to confirm your account");
  };

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    password &&
    confirmedPassword &&
    password === confirmedPassword;

  return (
    <div className="singup-overlay">
      <div className="signup-modal">
        <div className="signup-header">
          <strong>Sign Up</strong>
        </div>
        <form onSubmit={handleSignup}>
          <div className="signup-content">
            <div className="form-field">
              <label>First Name</label>
              <input
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>Last Name</label>
              <input
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmedPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmedPassword(e.target.value)}
                required
              />
              {password !== confirmedPassword && (
                <p style={{ color: "red" }}> Passwords do not match</p>
              )}
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="signup-buttons">              
              <button type="submit" disabled={!isFormValid || loading}>
                {loading ? "Processing...." : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
        <button onClick={finishSignUp}>Cancel</button>
      </div>
    </div>
  );
}

export default SignUpForm;

import { useState } from "react";
import { useAuth } from "./useAuth";

function ForgotPasswordForm({ finishForgotPassword }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const {resetPassword} = useAuth();
  const [message, setMessage] = useState("")

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    try{
      await resetPassword(email);
      setMessage("Reset link sent to email"); 
      setError("");
    }catch(err){
      setError(err.message)
    }
  };

  return (
    <div className="singup-overlay">
      <div className="signup-modal">
        <div className="signup-header"></div>
        <strong> Request Password Reset </strong>
        <form onSubmit={handlePasswordResetRequest}>
          <div className="signup-content">
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
            <p>{message}</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Request Password Reset</button>
          </div>
        </form>
        <button onClick={finishForgotPassword}>Cancel</button>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;

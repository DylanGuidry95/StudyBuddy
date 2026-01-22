import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

function PasswordRecoveryPage() {
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const { data: subscription } =
      supabase.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") {
          setReady(true);
        }
      });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  }

  const handleSubmit = async () => {
    setError("");
    try {
      await updatePassword(password);
      setSuccess("Password updated successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const isFormValid =
    password.length >= 8 &&
    password === confirmedPassword;

  if (!ready) {
    return <p>Validating reset link…</p>;
  }

  return (
    <div className="signup-content">
      <div className="form-field">
        <label>New Password</label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmedPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
      </div>

      {password && confirmedPassword && password !== confirmedPassword && (
        <p style={{ color: "red" }}>Passwords do not match</p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <button onClick={handleSubmit} disabled={!isFormValid}>
        Submit New Password
      </button>
    </div>
  );
}

export default PasswordRecoveryPage;

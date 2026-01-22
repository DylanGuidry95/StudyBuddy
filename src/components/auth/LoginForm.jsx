import { useState } from "react";
import { useAuth } from "./useAuth";
import SignUpForm from "./SignUpForm"
import ForgotPasswordFrom from "./ForgotPasswordForm"

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("")
    try{
       await signIn({email, password});
    } catch (err) {
      setEmail(err.message)
    } finally{
      setLoading(false)
    }
  };

  if(signingUp)
    return <SignUpForm finishSignUp={()=>setSigningUp(false)}/>

  if(forgotPassword)
    return <ForgotPasswordFrom finishForgotPassword={() => setForgotPassword(false)} />

  return (    
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br/>
      <button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign In"}</button>      
      <button onClick={()=> setSigningUp(true)} disabled={loading}>Sign Up</button>  
      <button  onClick={()=> setForgotPassword(true)} disabled={loading}>Forgot Password</button>  
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default LoginForm
import { useState } from "react";
import { useAuth } from "./useAuth";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ProfileUpdateForm from "./ProfileUpdateForm"

export function AuthControls({}) {
  const auth = useAuth();
  const [onBoard, setOnboard] = useState(false)
  const [profileView, setProfileView] = useState(false)

  if (auth.loading) return <p>Loading...</p>;

  if (!auth.user) {
    return (
      <>
        <LoginForm onLogin></LoginForm>
        <br/>

        <button onClick={() => setOnboard(true)}>Create Account</button>
        {onBoard &&
        <SignUpForm onSignUp finishSignUp={()=> setOnboard(false)}></SignUpForm>
        }
        <br />
      </>
    );
  }

  return (
    <>
      <p>Logged in as {auth.user.email}</p>
      <button onClick={auth.signOut}>Log out</button>
      <button onClick={setProfileView}>Edit Account</button>
      {profileView &&
        <ProfileUpdateForm/>
      }
    </>
  );
}

export default AuthControls;

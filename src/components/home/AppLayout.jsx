import AuthControls from "../auth/authControls";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const isRecovery = window.location.hash.includes("type=recovery");

  return (
    <>
      {!isRecovery && <AuthControls />}
      <Outlet />
    </>
  );
}

export default AppLayout;

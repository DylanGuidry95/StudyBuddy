import AuthControls from "../auth/authControls";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <AuthControls />
      <Outlet />
    </>
  );
}

export default AppLayout;

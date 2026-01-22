import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/home/AppLayout";
import HomeLayout from "./components/home/HomeLayout";
import SubjectDetail from "./components/subjects/SubjectDetail";
import { useAuthContext } from "./components/auth/AuthProvider";
import PasswordRecoveryPage from "./components/auth/PasswordRecoveryPage";

function App() {
  const { user, authLoading } = useAuthContext();
  console.log("APP AUTH:", { authLoading, user });

  if (authLoading) return <p>Loading…</p>;

  return (
    <Routes>
      <Route path="/reset-password" element={<PasswordRecoveryPage />} />
      <Route element={<AppLayout />}>
        <Route index element={<HomeLayout />} />
        <Route
          path="subjects/:id"
          element={user ? <SubjectDetail /> : <Navigate to="/" replace />}
        />        
      </Route>
    </Routes>
  );
}

export default App;

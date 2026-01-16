import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/home/AppLayout";
import HomeLayout from "./components/home/HomeLayout";
import SubjectDetail from "./components/subjects/SubjectDetail";
import { useAuthContext } from "./components/auth/AuthProvider";


function App() {
  const { user, loading } = useAuthContext();

  if (loading) return <p>Loading…</p>;

  return (    
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomeLayout />} />
          <Route
          path="subjects/:id"
          element={
            user ? <SubjectDetail /> : <Navigate to="/" replace />
          }
        />
        </Route>
      </Routes>    
  );
}

export default App;

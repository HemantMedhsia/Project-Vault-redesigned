import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProjectDetailRoute from "./pages/project/ProjectDetailRoute";
import NewProjectPage from "./pages/project/NewProjectPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailRoute />} />
        <Route path="/projects/new" element={<NewProjectPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;

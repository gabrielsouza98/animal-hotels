import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/Login/LoginPage.tsx";
import { DashboardPage } from "../pages/Dashboard/DashboardPage.tsx";
import { TutorsListPage } from "../pages/Tutors/TutorsListPage.tsx";
import { TutorFormPage } from "../pages/Tutors/TutorFormPage.tsx";
import { AnimalsListPage } from "../pages/Animals/AnimalsListPage.tsx";
import { AnimalFormPage } from "../pages/Animals/AnimalFormPage.tsx";
import { ProtectedRoute } from "../components/ProtectedRoute.tsx";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROTA PÚBLICA */}
        <Route path="/login" element={<LoginPage />} />

        {/* ROTAS PRIVADAS */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/tutors" element={
          <ProtectedRoute>
            <TutorsListPage />
          </ProtectedRoute>
        } />

        <Route path="/tutors/new" element={
          <ProtectedRoute>
            <TutorFormPage />
          </ProtectedRoute>
        } />

        <Route path="/tutors/:id/edit" element={
          <ProtectedRoute>
            <TutorFormPage />
          </ProtectedRoute>
        } />


        <Route path="/animals" element={
          <ProtectedRoute>
            <AnimalsListPage />
          </ProtectedRoute>
        } />

        <Route path="/animals/new" element={
          <ProtectedRoute>
            <AnimalFormPage />
          </ProtectedRoute>
        } />

        <Route path="/animals/:id/edit" element={
          <ProtectedRoute>
            <AnimalFormPage />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

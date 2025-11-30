import { useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toast";

export function DashboardPage() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = useCallback(() => {
    logout();
    showToast("Logout realizado com sucesso!", "info");
    navigate("/login");
  }, [logout, navigate, showToast]);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              Olá, {state.user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/tutors")}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">Tutores</h2>
            <p className="text-gray-600">Gerenciar tutores</p>
          </div>

          <div
            onClick={() => navigate("/animals")}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">Animais</h2>
            <p className="text-gray-600">Gerenciar animais</p>
          </div>
        </div>
      </div>
    </div>
  );
}


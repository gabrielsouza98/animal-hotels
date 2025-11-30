import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiClient";
import type { Tutor } from "../../types/index";
import { useToast } from "../../components/Toast";

export function TutorsListPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = useCallback(async () => {
    try {
      const { data } = await api.get<Tutor[]>("/tutors");
      setTutors(data);
    } catch (error) {
      console.error("Erro ao carregar tutores:", error);
      showToast("Erro ao carregar tutores", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const handleDelete = useCallback(
    async (id: number, name: string) => {
      if (!window.confirm(`Tem certeza que deseja excluir o tutor "${name}"?`)) {
        return;
      }

      setDeletingId(id);
      try {
        await api.delete(`/tutors/${id}`);
        showToast("Tutor excluído com sucesso!", "success");
        await loadTutors();
      } catch (error) {
        console.error("Erro ao excluir tutor:", error);
        showToast("Erro ao excluir tutor", "error");
      } finally {
        setDeletingId(null);
      }
    },
    [loadTutors, showToast]
  );

  const isEmpty = useMemo(() => tutors.length === 0, [tutors.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tutores</h1>
          <button
            onClick={() => navigate("/tutors/new")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Novo Tutor
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Telefone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isEmpty ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Nenhum tutor cadastrado ainda.
                  </td>
                </tr>
              ) : (
                tutors.map((tutor) => (
                <tr key={tutor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {tutor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tutor.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tutor.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/tutors/${tutor.id}/edit`)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(tutor.id, tutor.name)}
                        disabled={deletingId === tutor.id}
                        className="text-red-600 hover:text-red-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === tutor.id ? "Excluindo..." : "Excluir"}
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


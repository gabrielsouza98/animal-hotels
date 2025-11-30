import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiClient";
import type { Animal, Tutor } from "../../types/index";
import { useToast } from "../../components/Toast";

export function AnimalsListPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [tutors, setTutors] = useState<Record<number, Tutor>>({});
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(async () => {
    try {
      const [animalsRes, tutorsRes] = await Promise.all([
        api.get<Animal[]>("/animals"),
        api.get<Tutor[]>("/tutors"),
      ]);

      setAnimals(animalsRes.data);
      const tutorsMap: Record<number, Tutor> = {};
      tutorsRes.data.forEach((tutor) => {
        tutorsMap[tutor.id] = tutor;
      });
      setTutors(tutorsMap);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      showToast("Erro ao carregar dados", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const handleDelete = useCallback(
    async (id: number, name: string) => {
      if (!window.confirm(`Tem certeza que deseja excluir o animal "${name}"?`)) {
        return;
      }

      setDeletingId(id);
      try {
        await api.delete(`/animals/${id}`);
        showToast("Animal excluído com sucesso!", "success");
        await loadData();
      } catch (error) {
        console.error("Erro ao excluir animal:", error);
        showToast("Erro ao excluir animal", "error");
      } finally {
        setDeletingId(null);
      }
    },
    [loadData, showToast]
  );

  const isEmpty = useMemo(() => animals.length === 0, [animals.length]);

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
          <h1 className="text-3xl font-bold">Animais</h1>
          <button
            onClick={() => navigate("/animals/new")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Novo Animal
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
                  Espécie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Raça
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Idade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tutor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isEmpty ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhum animal cadastrado ainda.
                  </td>
                </tr>
              ) : (
                animals.map((animal) => (
                <tr key={animal.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {animal.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {animal.species}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {animal.breed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {animal.age} anos
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tutors[animal.tutorId]?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/animals/${animal.id}/edit`)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(animal.id, animal.name)}
                        disabled={deletingId === animal.id}
                        className="text-red-600 hover:text-red-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === animal.id ? "Excluindo..." : "Excluir"}
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


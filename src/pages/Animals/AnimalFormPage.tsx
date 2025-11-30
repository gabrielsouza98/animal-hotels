import { useEffect, useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/apiClient";
import type { Animal, Tutor, Species } from "../../types/index";
import { useToast } from "../../components/Toast";

type AnimalFormValues = {
  name: string;
  species: Species;
  breed: string;
  age: number;
  tutorId: number;
  photoUrl?: string;
};

export function AnimalFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<AnimalFormValues>();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const isEdit = !!id;

  useEffect(() => {
    loadTutors();
    if (isEdit) {
      loadAnimal();
    }
  }, [id]);

  const loadTutors = useCallback(async () => {
    try {
      const { data } = await api.get<Tutor[]>("/tutors");
      setTutors(data);
    } catch (error) {
      console.error("Erro ao carregar tutores:", error);
      showToast("Erro ao carregar tutores", "error");
    }
  }, [showToast]);

  const loadAnimal = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const { data } = await api.get<Animal>(`/animals/${id}`);
      setValue("name", data.name);
      setValue("species", data.species);
      setValue("breed", data.breed);
      setValue("age", data.age);
      setValue("tutorId", data.tutorId);
      if (data.photoUrl) {
        setValue("photoUrl", data.photoUrl);
      }
    } catch (error) {
      console.error("Erro ao carregar animal:", error);
      showToast("Erro ao carregar animal", "error");
      navigate("/animals");
    } finally {
      setLoading(false);
    }
  }, [id, setValue, showToast, navigate]);

  const onSubmit = useCallback(async (values: AnimalFormValues) => {
    try {
      if (isEdit && id) {
        await api.put(`/animals/${id}`, values);
        showToast("Animal atualizado com sucesso!", "success");
      } else {
        await api.post("/animals", values);
        showToast("Animal cadastrado com sucesso!", "success");
      }
      navigate("/animals");
    } catch (error) {
      console.error("Erro ao salvar animal:", error);
      showToast("Erro ao salvar animal", "error");
    }
  }, [isEdit, id, navigate, showToast]);

  const hasTutors = useMemo(() => tutors.length > 0, [tutors.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!hasTutors && !isEdit) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
            <p className="text-yellow-800">
              Você precisa cadastrar pelo menos um tutor antes de cadastrar um animal.
            </p>
          </div>
          <button
            onClick={() => navigate("/tutors/new")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Cadastrar Tutor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {isEdit ? "Editar Animal" : "Novo Animal"}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { 
                required: "Nome é obrigatório",
                minLength: { value: 2, message: "Nome deve ter pelo menos 2 caracteres" }
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Espécie <span className="text-red-500">*</span>
            </label>
            <select
              {...register("species", { required: "Espécie é obrigatória" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                errors.species ? "border-red-500" : ""
              }`}
            >
              <option value="">Selecione...</option>
              <option value="gato">Gato</option>
              <option value="cachorro">Cachorro</option>
            </select>
            {errors.species && (
              <p className="text-red-500 text-xs mt-1">{errors.species.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Raça <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("breed", { 
                required: "Raça é obrigatória",
                minLength: { value: 2, message: "Raça deve ter pelo menos 2 caracteres" }
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                errors.breed ? "border-red-500" : ""
              }`}
            />
            {errors.breed && (
              <p className="text-red-500 text-xs mt-1">{errors.breed.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Idade <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="30"
              {...register("age", { 
                required: "Idade é obrigatória",
                valueAsNumber: true,
                min: { value: 0, message: "Idade deve ser maior ou igual a 0" },
                max: { value: 30, message: "Idade deve ser menor ou igual a 30" }
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                errors.age ? "border-red-500" : ""
              }`}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tutor <span className="text-red-500">*</span>
            </label>
            <select
              {...register("tutorId", { 
                required: "Tutor é obrigatório",
                valueAsNumber: true
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                errors.tutorId ? "border-red-500" : ""
              }`}
            >
              <option value="">Selecione um tutor...</option>
              {tutors.map((tutor) => (
                <option key={tutor.id} value={tutor.id}>
                  {tutor.name}
                </option>
              ))}
            </select>
            {errors.tutorId && (
              <p className="text-red-500 text-xs mt-1">{errors.tutorId.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              URL da Foto (opcional)
            </label>
            <input
              type="url"
              {...register("photoUrl", {
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                  message: "URL inválida ou formato de imagem não suportado"
                }
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                errors.photoUrl ? "border-red-500" : ""
              }`}
              placeholder="https://exemplo.com/foto.jpg"
            />
            {errors.photoUrl && (
              <p className="text-red-500 text-xs mt-1">{errors.photoUrl.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !hasTutors}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/animals")}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


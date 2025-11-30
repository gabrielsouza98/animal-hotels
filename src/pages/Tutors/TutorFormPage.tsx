import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/apiClient";
import type { Tutor } from "../../types/index";
import { useToast } from "../../components/Toast";

type TutorFormValues = {
  name: string;
  email: string;
  phone: string;
};

export function TutorFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<TutorFormValues>();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      loadTutor();
    }
  }, [id]);

  const loadTutor = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const { data } = await api.get<Tutor>(`/tutors/${id}`);
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("phone", data.phone);
    } catch (error) {
      console.error("Erro ao carregar tutor:", error);
      showToast("Erro ao carregar tutor", "error");
      navigate("/tutors");
    } finally {
      setLoading(false);
    }
  }, [id, setValue, showToast, navigate]);

  const onSubmit = useCallback(async (values: TutorFormValues) => {
    try {
      if (isEdit && id) {
        await api.put(`/tutors/${id}`, values);
        showToast("Tutor atualizado com sucesso!", "success");
      } else {
        await api.post("/tutors", values);
        showToast("Tutor cadastrado com sucesso!", "success");
      }
      navigate("/tutors");
    } catch (error) {
      console.error("Erro ao salvar tutor:", error);
      showToast("Erro ao salvar tutor", "error");
    }
  }, [isEdit, id, navigate, showToast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {isEdit ? "Editar Tutor" : "Novo Tutor"}
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
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", { 
                required: "Email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido"
                }
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Telefone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("phone", { 
                required: "Telefone é obrigatório",
                pattern: {
                  value: /^[\d\s\(\)\-]+$/,
                  message: "Telefone inválido"
                }
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="(00) 00000-0000"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/tutors")}
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


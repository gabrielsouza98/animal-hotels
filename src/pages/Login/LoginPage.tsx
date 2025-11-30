import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const { login, state } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      try {
        setError(null);
        await login(values.email, values.password);
        navigate("/");
      } catch (err) {
        setError("Email ou senha inválidos");
      }
    },
    [login, navigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          AnimalHotels - Login
        </h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Senha</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <button
          type="submit"
          disabled={state.loading}
          className="w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {state.loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

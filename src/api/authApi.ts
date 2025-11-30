import api from "./apiClient";
import type { User } from "../types/index";

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginRequest({ email, password }: LoginPayload) {
  const { data } = await api.get<User[]>("/users", {
    params: { email, password },
  });

  if (data.length === 0) {
    throw new Error("Credenciais inválidas");
  }

  const user = data[0];

  // Simulando token JWT
  const fakeToken = "fake-token-" + user.id;

  return { user, token: fakeToken };
}

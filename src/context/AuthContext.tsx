import {
    createContext,
    useContext,
    useReducer,
    useEffect,
  } from "react";
  import type { ReactNode } from "react";
  import type { User } from "../types/index";
  import { loginRequest } from "../api/authApi";
  
  type AuthState = {
    user: User | null;
    token: string | null;
    loading: boolean;
  };
  
  type AuthAction =
    | { type: "LOGIN_START" }
    | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
    | { type: "LOGIN_ERROR" }
    | { type: "LOGOUT" }
    | { type: "RESTORE_SESSION"; payload: { user: User; token: string } | null };
  
  type AuthContextType = {
    state: AuthState;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
  };
  
  function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
      case "LOGIN_START":
        return { ...state, loading: true };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
        };
      case "LOGIN_ERROR":
        return { ...state, loading: false };
      case "LOGOUT":
        return { ...initialState };
      case "RESTORE_SESSION":
        if (!action.payload) return state;
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
        };
      default:
        return state;
    }
  }
  
  type Props = {
    children: ReactNode;
  };
  
  export function AuthProvider({ children }: Props) {
    const [state, dispatch] = useReducer(authReducer, initialState);
  
    // Ao abrir a página → restaurar usuário salvo
    useEffect(() => {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed = JSON.parse(stored) as { user: User; token: string };
        dispatch({ type: "RESTORE_SESSION", payload: parsed });
      }
    }, []);
  
    // Login
    async function login(email: string, password: string) {
      try {
        dispatch({ type: "LOGIN_START" });
        const { user, token } = await loginRequest({ email, password });
        dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
  
        // Salvar no navegador
        localStorage.setItem("auth", JSON.stringify({ user, token }));
        localStorage.setItem("token", token);
      } catch {
        dispatch({ type: "LOGIN_ERROR" });
        throw new Error("Credenciais inválidas");
      }
    }
  
    // Logout
    function logout() {
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    }
  
    const value: AuthContextType = {
      state,
      login,
      logout,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
  
  export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return ctx;
  }
  
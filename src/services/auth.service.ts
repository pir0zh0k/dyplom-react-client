import { $withoutToken } from "@/api";
import { ILogin } from "@/types/AuthTypes";

class AuthService {
  async login({ username, password }: ILogin) {
    return await $withoutToken
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => response.data)
      .catch((err) => err);
  }

  logout = () => {
    return localStorage.removeItem("token");
  };
}

export const useAuth = new AuthService();

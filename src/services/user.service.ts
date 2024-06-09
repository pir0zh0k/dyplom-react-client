import { $withToken } from "@/api";
import { userStore } from "@/store/user.store";
import { IUser } from "@/types/UserTypes.ts";

class UserService {
  async getUser() {
    try {
      const res = await $withToken.get("/user/getById");
      const user: IUser = res.data;

      userStore.setUser(
        user.id,
        user.username,
        user.full_name,
        user.email,
        user.phone,
        user.role,
      );

      userStore.setStatus(user.status);
    } catch (err) {
      console.log(err);
      userStore.reset();
    }
  }

  updateStatus(status: string) {
    $withToken
      .post("/user/status", {
        status: status,
      })
      .then((res) => {
        userStore.setStatus(res.data.status);
      })
      .catch((err) => console.log(err));
  }

  async getAllUsers() {
    try {
      const res = await $withToken.get("/user/getAll");
      return res.data;
    } catch (err) {
      return err;
    }
  }

  async createUser(user: {
    full_name: string;
    email: string;
    phone: string;
    role: string;
    username: string;
    password: string;
  }) {
    return await $withToken.post("/user/create", user);
  }
}

export const useUser = new UserService();

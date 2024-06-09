import { makeAutoObservable } from "mobx";

class UserStore {
  isAuth: boolean = false;
  id: string = "";
  username: string = "";
  fullName: string = "";
  email: string = "";
  phone: string = "";
  status: string | undefined = undefined;
  role: "ADMIN" | "USER" | "" = "";

  constructor() {
    makeAutoObservable(this);
  }

  setUser(
    id: string,
    username: string,
    fullName: string,
    email: string,
    phone: string,
    role: "ADMIN" | "USER" | "",
  ) {
    this.id = id;
    this.isAuth = true;
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.role = role;
  }

  setStatus(statusValue: string) {
    this.status = statusValue;
  }

  reset() {
    this.id = "";
    this.isAuth = false;
    this.username = "";
    this.email = "";
    this.fullName = "";
    this.phone = "";
    this.status = undefined;
    this.role = "";
    localStorage.removeItem("token");
  }
}

export const userStore = new UserStore();

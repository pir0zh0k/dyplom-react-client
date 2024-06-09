export interface IUser {
  id: string;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  role: "ADMIN" | "USER";
}

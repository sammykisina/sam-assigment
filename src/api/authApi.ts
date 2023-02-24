import type { LoginData } from "src/types/typings.t";
import { API } from "./api";

const AuthAPI = {
  login: async (data: LoginData) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInVzZXJJZCI6MTAxfQ.LjcuTtViQZrIJyp1BdWy2EOng7h-UUMvdNd7hhOC1hg";
    return {
      message: "Welcome back.",
      token,
    };
  },
};

export default AuthAPI;

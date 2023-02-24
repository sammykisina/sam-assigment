import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/api";
import type { LoginData } from "src/types/typings.t";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Notifications } from "@/components";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/reducer";

export type User = {
  name: string;
  email: string;
  role: string;
};

const useAuth = () => {
  /**
   * hook states
   */
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.app.client.auth.user);
  const isAuthenticated = useSelector(
    (state: any) => state.app.client.auth.isAuthenticated
  );
  const token = Cookies.get("token");

  /**
   * hook functions
   */
  const { mutateAsync: loginMutateAsync, isLoading: isLogging } = useMutation({
    mutationFn: (loginData: LoginData) => {
      return AuthAPI.login(loginData);
    },

    onSuccess: async (data) => {
      dispatch(setCurrentUser({ user: jwt_decode(data.token) }));

      Cookies.set("token", data.token);
      await redirect();
      router.refresh();
      Notifications.successNotification(data.message);
    },
  });

  const redirect = async () => await router.push("/");

  const logout = () => {
    Cookies.remove("token");

    router.refresh();
  };

  useEffect(() => {
    if (token !== undefined) {
      dispatch(setCurrentUser({ user: jwt_decode(token || "") }));
    }
  }, [token, dispatch]);

  return {
    user,
    loginMutateAsync,
    isLogging,
    logout,
    isAuthenticated,
  };
};

export default useAuth;

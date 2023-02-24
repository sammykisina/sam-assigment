import type { ReactNode } from "react";

export type LoginData = {
  email: string;
  password: string;
};

export type Route = {
  inactiveIcon?: ReactNode;
  activeIcon?: ReactNode;
  name?: string | ReactNode;
  to: string;
};

export type SelectionOption = {
  name: string;
  value: string;
};

export type Post = {
  id?: number;
  body: string;
  title: string;
  userId: number;
};

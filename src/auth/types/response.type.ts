import { User } from "src/users/domain/user";

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;

export type SuccessResponseType = Readonly<{
  status: "success";
  message?: string;
}>;

export type ErrorResponseType = Readonly<{
  status: "error";
  message?: string;
}>;

import { logInType, logOutType } from "./actionTypesLogin";

export const logInAction = (userName: string): { type: string; payload: string } => ({
  type: logInType,
  payload: userName,
});

export const logOutAction = (): { type: string } => ({
  type: logOutType,
});

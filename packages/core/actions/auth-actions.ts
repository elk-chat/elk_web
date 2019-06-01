import {

} from "@little-chat/sdk";

export interface LoginForm {
  UserName: string;
  Password: string;
}

export const APPLY_LOGIN = "APPLY_LOGIN";
export function applyLogin(form: LoginForm) {
  return {
    form,
    type: APPLY_LOGIN,
  };
}

export enum AuthActionTypes {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register success',
  REGISTER_FAILURE = '[Auth] Register failure',

  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login failure',

  LOGOUT = '[Auth] Logout',

  SWITCH_MODE = '[Auth] Switch mode',

  SET_AUTH_USER = '[Auth] Set auth user',
}

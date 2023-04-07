import { IUser } from 'src/app/auth/types/user.interface';

export interface AuthStateInterface {
  user: IUser | null;
  isAuth: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  isLoginMode: boolean;
}

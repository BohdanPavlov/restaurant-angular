import { IUser } from 'src/app/auth/types/user.interface';

export interface AuthResponseInterface {
  accessToken: string;
  user: IUser;
}

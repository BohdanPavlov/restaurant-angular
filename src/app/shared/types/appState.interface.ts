import { AuthStateInterface } from 'src/app/auth/types/authState.interface';
import { MenuStateInterface } from 'src/app/menu/types/menuState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  menu: MenuStateInterface;
}

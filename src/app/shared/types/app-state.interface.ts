import { AuthStateInterface } from 'src/app/auth/types/auth-state.interface';
import { MenuStateInterface } from 'src/app/menu/types/menu-state.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  menu: MenuStateInterface;
}

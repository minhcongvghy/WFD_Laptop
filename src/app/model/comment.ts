import {Product} from './product';
import {User} from './user';

export interface Comment {
  id?: string;
  content?: string;
  date?: string;
  edit?: string;
  idProduct?: string;
  product?: Product;
  user?: User;
}

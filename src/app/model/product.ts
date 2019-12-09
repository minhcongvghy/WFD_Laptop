import {Line} from './line';
import {User} from './user';

export interface Product {
  id?: string;
  name?: string;
  cpu?: string;
  ram?: string;
  price?: string;
  description?: string;
  urlFile?: string;
  blobString?: string;
  isUpdate?: string;
  line?: Line;
  user?: User;
}

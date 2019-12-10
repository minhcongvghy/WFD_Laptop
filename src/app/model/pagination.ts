import {Product} from './product';

export interface Pagination {
  content: Product[];
  empty;
  first;
  last;
  number;
  numberOfElements;
  size;
  sort;
  totalElements;
  totalPages;
}

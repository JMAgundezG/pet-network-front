import { ListedUser } from '@/lib/models/ListedUser';

export interface UsersListData {
  users: ListedUser[];
  numberOfPages: number;
  currentPage: number;
}

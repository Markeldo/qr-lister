import { IUser } from 'src/shared/types';

export { IUser };

export type RegisterPayloadData = {
  name: string;
  email: string;
  password: string;
};

type IUserGetData = {
  onlyIfNoData: boolean;
};
export type IUserGetDataFunction = (params?: IUserGetData) => void;

export interface IUserStore extends IUser {
  unsubscribe?: () => void;
}

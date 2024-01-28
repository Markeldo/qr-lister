import { IUser } from 'src/shared/types';
export {
  IManagerOfTeam,
  IMemberOfTeam,
  IRegisterFormData,
  IUser,
} from 'src/shared/types';

type IUserGetData = {
  onlyIfNoData: boolean;
};
export type IUserGetDataFunction = (params?: IUserGetData) => void;

export interface IUserStore extends IUser {
  unsubscribe?: () => void;
}


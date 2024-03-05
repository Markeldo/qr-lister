import { RouteLocationNormalized } from 'vue-router';
import { IUser } from 'src/shared/types';

export type Scopes =
  | 'IS_NOT_LOGGED_IN'
  | 'IS_LOGGED_IN'
  | 'HAS_EMPTY_PROFILE'
  | 'CAN_VIEW_TEAM'
  | 'CAN_MANAGE_TEAM'
  | 'IS_OWNER'
  | 'IS_GIVEAWAY_ACTIVE'
  | 'IS_GIVEAWAY_PREPARED'
  | 'UNREACHABLE_ROUTE';

export type ScopesArrayType = {
  [index in string]: boolean;
};

type ScopesVariants = boolean | ScopesArrayType;

export type ToPayload = {
  to: RouteLocationNormalized;
};

export type UserScopesInterface = {
  [index in Scopes]?: ScopesVariants;
};

export type CombinedPayload = ToPayload | string | null;

export type IScopesFunction<T = CombinedPayload> = (
  user?: IUser | null,
  payload?: T
) => Promise<UserScopesInterface | undefined>;

export type IAllScopesFunctions<T = CombinedPayload> = {
  [index in Scopes]?: IScopesFunction<T>;
};

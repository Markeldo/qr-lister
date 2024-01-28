import { IScopesFunction } from '..';

export const isLoggedIn: IScopesFunction = async (user) => {
  return {
    IS_LOGGED_IN: !!user?.id,
    IS_NOT_LOGGED_IN: !user?.id,
  };
};


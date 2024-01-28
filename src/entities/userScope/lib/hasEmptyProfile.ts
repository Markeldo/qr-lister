import { useUserStore } from 'src/entities/user';
import { IScopesFunction } from '..';

export const hasEmptyProfile: IScopesFunction = async (user) => {
  const store = useUserStore();
  if (!user?.id) {
    return;
  }
  if (!store.isCurrentUserFullfilled) {
    await store.userGetData();
  }
  console.log(`isCurrentUserFullfilled ${store.isCurrentUserFullfilled}`);
  return {
    HAS_EMPTY_PROFILE: !store.isCurrentUserFullfilled,
  };
};

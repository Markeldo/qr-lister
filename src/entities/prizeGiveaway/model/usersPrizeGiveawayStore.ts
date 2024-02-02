import { defineStore } from 'pinia';
import { useCachedFunction } from 'src/shared/composables';
import { useApiPrizeGiveawaysRead } from '../api';

export const useUsersPrizeGiveawayStore = defineStore('user.events', () => {
  const { fetch } = useApiPrizeGiveawaysRead();
  const { execute: memoizedFetch, currentCacheResult: store } =
    useCachedFunction(fetch);

  const read = (payload: { user_id: string }) => {
    return memoizedFetch({ ...payload });
  };

  return {
    store,

    read,
  };
});

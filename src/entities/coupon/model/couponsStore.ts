import { defineStore } from 'pinia';
import { useCachedFunction } from 'src/shared/composables';
import { useApiCouponsRead } from '../api';

export const useCouponsStore = defineStore('user.coupons', () => {
  const { fetch } = useApiCouponsRead();
  const { execute: memoizedFetch, currentCacheResult: store } =
    useCachedFunction(fetch);

  const read = (payload: { giveaway_id: string }) => {
    return memoizedFetch({ ...payload });
  };

  return {
    store,

    read,
  };
});

import { defineStore } from 'pinia';
import { useCachedFunction } from 'src/shared/composables';
import { useApiCouponsRead } from '../api';

export const useCouponsStore = defineStore('coupons', () => {
  const { fetch, error } = useApiCouponsRead();
  const { execute: memoizedFetch, currentCacheResult: store } =
    useCachedFunction(fetch);

  const read = (payload: { giveaway_id: string }) => {
    return memoizedFetch({ ...payload });
  };

  return {
    store,
    error,

    read,
  };
});

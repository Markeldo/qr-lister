import { computed } from 'vue';
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

  const currentCouponsCount = computed(() => store.value.data?.length || 0);

  const registeredCoupounsCount = computed(
    () =>
      store.value.data?.filter(({ is_registered }) => !!is_registered).length ||
      0
  );

  return {
    store,
    error,
    currentCouponsCount,
    registeredCoupounsCount,

    read,
  };
});

import { defineStore } from 'pinia';
import { useCachedFunction } from 'src/shared/composables';
import { useApiCouponRead } from '..';

export const useCouponStore = defineStore('coupon', () => {
  const { fetch } = useApiCouponRead();
  const {
    execute: memoizedFetch,
    currentCacheResult: store,
    invalidateByTag,
  } = useCachedFunction(fetch, ['coupon']);

  const read = (id: string) => {
    return memoizedFetch(id);
  };

  /*const update = async (formData: IEventUpdateData) => {
    await updateEvent(formData);
    if (store.value.data?.id) {
      read(store.value.data.id);
    }
  };*/

  return {
    store,

    read,
    invalidateByTag,
  };
});

import { defineStore } from 'pinia';
import { useCachedFunction } from 'src/shared/composables';
import { ICouponUpdateOwner, useApiCouponRead, useApiCouponUpdate } from '..';

export const useCouponStore = defineStore('coupon', () => {
  const { fetch } = useApiCouponRead();
  const { updateCouponOwner, updateCouponRegistered } = useApiCouponUpdate();
  const {
    execute: memoizedFetch,
    currentCacheResult: store,
    invalidateByTag,
  } = useCachedFunction(fetch, ['coupon']);

  const read = (id: string) => {
    return memoizedFetch(id);
  };

  const updateOwner = async (payload: ICouponUpdateOwner) => {
    await updateCouponOwner(payload);
    read(payload.id);
  };

  const updateIsRegistered = async (id: string) => {
    await updateCouponRegistered(id);
    read(id);
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
    updateOwner,
    updateIsRegistered,
    invalidateByTag,
  };
});

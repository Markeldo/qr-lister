import { defineStore } from 'pinia';
import { useCachedFunction } from 'src/shared/composables';
import { ICouponUpdateOwner, useApiCouponRead, useApiCouponUpdate } from '..';

export const useCouponStore = defineStore('coupon', () => {
  const { fetch, error } = useApiCouponRead();
  const { updateCouponOwner, updateCouponRegistered, setWinnerCoupon } =
    useApiCouponUpdate();
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

  const setWinner = async (id: string) => {
    await setWinnerCoupon(id);
  };

  /*const update = async (formData: IEventUpdateData) => {
    await updateEvent(formData);
    if (store.value.data?.id) {
      read(store.value.data.id);
    }
  };*/

  return {
    store,
    error,

    read,
    updateOwner,
    updateIsRegistered,
    invalidateByTag,
    setWinner,
  };
});

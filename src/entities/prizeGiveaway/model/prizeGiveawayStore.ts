import { defineStore } from 'pinia';
import { useCachedFunction } from 'src/shared/composables';
import { useApiPrizeGiveawayRead } from '..';

export const usePrizeGiveawayStore = defineStore('prizeGiveaway', () => {
  const { fetch } = useApiPrizeGiveawayRead();
  const {
    execute: memoizedFetch,
    currentCacheResult: store,
    invalidateByTag,
  } = useCachedFunction(fetch, ['prizeGiveaway']);

  const read = (eventId: string) => {
    return memoizedFetch(eventId);
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

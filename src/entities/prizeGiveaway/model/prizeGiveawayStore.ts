import { defineStore } from 'pinia';
import { useCachedFunction } from 'src/shared/composables';
import {
  GiveawayStatuses,
  useApiPrizeGiveawayRead,
  useApiPrizeGiveawayUpdate,
} from '..';

export const usePrizeGiveawayStore = defineStore('prizeGiveaway', () => {
  const { fetch } = useApiPrizeGiveawayRead();
  const { updatePrizeGiveawayStatus, updatePrizeGiveaway } =
    useApiPrizeGiveawayUpdate();
  const {
    execute: memoizedFetch,
    currentCacheResult: store,
    invalidateByTag,
  } = useCachedFunction(fetch, ['prizeGiveaway']);

  const read = (id: string) => {
    return memoizedFetch(id);
  };

  const updateStatus = async (payload: {
    id: string;
    status: GiveawayStatuses;
  }) => {
    await updatePrizeGiveawayStatus(payload);
    read(payload.id);
  };

  const update = async (payload: {
    id: string;
    name: string;
    logo?: string;
  }) => {
    await updatePrizeGiveaway(payload);
    read(payload.id);
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
    fetch,
    update,
    updateStatus,
    invalidateByTag,
  };
});

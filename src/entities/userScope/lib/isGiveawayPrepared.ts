import { usePrizeGiveawayStore } from 'src/entities/prizeGiveaway';
import { IScopesFunction, ToPayload } from '..';

const returnValue = (result = false) => {
  return {
    IS_GIVEAWAY_PREPARED: !!result,
  };
};

export const isGiveawayPrepared: IScopesFunction = async (_, payload) => {
  const giveawayStore = usePrizeGiveawayStore();
  const giveawayId = (
    (payload as ToPayload)?.to?.params?.id || payload
  )?.toString();
  if (!giveawayId) {
    return returnValue();
  }
  if (!giveawayStore.store?.data) {
    const result = await giveawayStore.fetch(giveawayId);
    return returnValue(result?.status === 'registration_closed');
  }
  return returnValue(
    giveawayStore.store.data?.status === 'registration_closed'
  );
};

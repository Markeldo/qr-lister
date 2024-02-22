import { ref, watch } from 'vue';
import { supabase } from 'src/app/boot/supabase';
import { useApiQuery } from 'src/shared/composables/useApiQuery';
import { GiveawayStatuses } from '../model';

const isLoading = ref(false);

export const useApiPrizeGiveawayUpdate = () => {
  const { error, isLoading: isQueryLoading, fetchQuery } = useApiQuery();

  const updatePrizeGiveaway = async ({
    id,
    ...data
  }: {
    id: string;
    name: string;
  }) => {
    const query = supabase
      .from('prize_giveaway')
      .update(data)
      .eq('id', id)
      .select();
    await fetchQuery(query, { checkDataExistance: true });
  };

  const updatePrizeGiveawayStatus = async ({
    id,
    ...data
  }: {
    id: string;
    status: GiveawayStatuses;
  }) => {
    const query = supabase
      .from('prize_giveaway')
      .update(data)
      .eq('id', id)
      .select();
    await fetchQuery(query, { checkDataExistance: true });
  };

  watch(isQueryLoading, () => {
    if (isLoading.value != isQueryLoading.value) {
      isLoading.value = isQueryLoading.value;
    }
  });

  return {
    error,
    isLoading,

    updatePrizeGiveawayStatus,
    updatePrizeGiveaway,
  };
};

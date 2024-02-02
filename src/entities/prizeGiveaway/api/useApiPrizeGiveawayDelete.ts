import { ref, watch } from 'vue';
import { supabase } from 'src/app/boot/supabase';
import { useApiQuery } from 'src/shared/composables/useApiQuery';

const isLoading = ref(false);

export const useApiPrizeGiveawayDelete = () => {
  const { error, data, isLoading: isQueryLoading, fetchQuery } = useApiQuery();
  const deletePrizeGiveaway = async (id: string) => {
    const query = supabase
      .from('prize_giveaway')
      .delete()
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
    data,
    isLoading,
    error,

    deletePrizeGiveaway,
  };
};

import { ref, watch } from 'vue';
import { supabase } from 'src/app/boot/supabase';
import { useApiQuery } from 'src/shared/composables';
import { INewPrizeGiveaway, IPrizeGiveaway } from '../model';

const isLoading = ref(false);

export const useApiPrizeGiveawayCreate = () => {
  const { data, fetchQuery, isLoading: isQueryLoading } = useApiQuery();

  const createPrizeGiveaway = async (payload: INewPrizeGiveaway) => {
    const query = supabase.from('prize_giveaway').insert([payload]).select();
    await fetchQuery(query, { checkDataExistance: true });
    if (!data.value) {
      throw new Error('Что-то пошло не так');
    }
    return data.value[0] as IPrizeGiveaway;
  };

  watch(isQueryLoading, () => {
    if (isLoading.value != isQueryLoading.value) {
      isLoading.value = isQueryLoading.value;
    }
  });

  return {
    createPrizeGiveaway,
    isLoading,
  };
};

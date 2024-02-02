import { Ref, ref, watch } from 'vue';
import { supabase } from 'src/app/boot/supabase';
import { useApiQuery } from 'src/shared/composables';
import { IPrizeGiveaway } from '../model';

const isValid = ref(false);
const isLoading = ref(false);

const isPrizeGiveawayArray = (result: unknown): result is IPrizeGiveaway[] =>
  result instanceof Array && !!result[0]?.id;

export const useApiPrizeGiveawaysRead = () => {
  const {
    data,
    isLoading: isQueryLoading,
    isRefetching,
    fetchQuery,
  } = useApiQuery();

  /**
   * Получение списка розыгрышейсобытий
   **/
  const fetch = async ({ user_id }: { user_id: string }) => {
    let query = supabase.from('prize_giveaway').select('*');
    query = query.eq('user_id', user_id);

    await fetchQuery(query.returns<IPrizeGiveaway[]>());
    isValid.value = true;
    if (data.value && isPrizeGiveawayArray(data.value)) {
      return data.value;
    }
  };

  const invalidate = () => {
    isValid.value = false;
  };

  watch(isQueryLoading, () => {
    if (isLoading.value != isQueryLoading.value) {
      isLoading.value = isQueryLoading.value && !isRefetching;
    }
  });

  return {
    data: data as Ref<IPrizeGiveaway[] | null>,
    isLoading,
    isValid,

    fetch,
    invalidate,
  };
};

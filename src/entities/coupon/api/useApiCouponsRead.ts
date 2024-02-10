import { Ref, ref, watch } from 'vue';
import { supabase } from 'src/app/boot/supabase';
import { useApiQuery } from 'src/shared/composables';
import { ICoupon } from '../model';

const isValid = ref(false);
const isLoading = ref(false);

const isCouponsArray = (result: unknown): result is ICoupon[] =>
  result instanceof Array && !!result[0]?.id;

export const useApiCouponsRead = () => {
  const {
    data,
    isLoading: isQueryLoading,
    isRefetching,
    fetchQuery,
    error,
  } = useApiQuery();

  const fetch = async ({ giveaway_id }: { giveaway_id: string }) => {
    let query = supabase.from('coupon').select('*');
    query = query.eq('giveaway_id', giveaway_id).order('sequence_number');

    await fetchQuery(query.returns<ICoupon[]>());
    isValid.value = true;
    if (data.value && isCouponsArray(data.value)) {
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
    data: data as Ref<ICoupon[] | null>,
    isLoading,
    isValid,
    error,

    fetch,
    invalidate,
  };
};

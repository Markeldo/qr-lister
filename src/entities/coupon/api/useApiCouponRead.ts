import { Ref, ref, watch } from 'vue';
import { supabase } from 'src/app/boot/supabase';
import { useApiQuery } from 'src/shared/composables';
import { ICoupon } from '../model';

const isValid = ref(false);
const isLoading = ref(false);

export const useApiCouponRead = () => {
  const {
    isLoading: isQueryLoading,
    isRefetching,
    data: queryData,
    fetchQuery,
  } = useApiQuery();
  const data = ref<ICoupon>();

  /**
   * Получение списка розыгрышейсобытий
   **/
  const fetch = async (id: string) => {
    const query = supabase.from('coupon').select('*').eq('id', id).single();
    await fetchQuery(query);
    if (queryData.value) {
      data.value = queryData.value as unknown as ICoupon;
    }
    isValid.value = true;
    return data.value;
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
    data: data as Ref<ICoupon | null>,
    isLoading,
    isValid,

    fetch,
    invalidate,
  };
};

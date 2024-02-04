import { ref, watch } from 'vue';
import { supabase } from 'src/app/boot/supabase';
import { useApiQuery } from 'src/shared/composables';
import { ICoupon, INewCoupon } from '../model';

const isLoading = ref(false);

export const useApiCouponsCreate = () => {
  const { data, fetchQuery, isLoading: isQueryLoading } = useApiQuery();

  const createCoupons = async (payload: INewCoupon[]) => {
    const query = supabase.from('coupon').insert(payload).select();
    await fetchQuery(query, { checkDataExistance: true });
    if (!data.value) {
      throw new Error('Что-то пошло не так');
    }
    return data.value[0] as ICoupon;
  };

  watch(isQueryLoading, () => {
    if (isLoading.value != isQueryLoading.value) {
      isLoading.value = isQueryLoading.value;
    }
  });

  return {
    createCoupons,
    isLoading,
  };
};

import { ref, watch } from 'vue';
import { supabase } from 'src/app/boot/supabase';
import { useApiQuery } from 'src/shared/composables/useApiQuery';
import { ICouponUpdateOwner } from '../model';

const isLoading = ref(false);

export const useApiCouponUpdate = () => {
  const { error, isLoading: isQueryLoading, fetchQuery } = useApiQuery();
  /*const updateCoupon = async (
    formData: { name: string; logo?: string },
    team_id: string
  ) => {
    const query = supabase
      .from('coupon')
      .update(formData)
      .eq('id', team_id)
      .select();
    await fetchQuery(query, { checkDataExistance: true });
  };*/

  const updateCouponOwner = async ({ id, ...formData }: ICouponUpdateOwner) => {
    const query = supabase
      .from('coupon')
      .update(formData)
      .eq('id', id)
      .select();
    await fetchQuery(query, { checkDataExistance: true });
  };

  const updateCouponRegistered = async (id: string) => {
    const query = supabase
      .from('coupon')
      .update({ is_registered: true })
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

    updateCouponOwner,
    updateCouponRegistered,
  };
};

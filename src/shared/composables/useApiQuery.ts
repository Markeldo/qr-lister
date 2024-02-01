import { ref } from 'vue';
import { Notify } from 'quasar';
import type { PostgrestBuilder } from '@supabase/postgrest-js';

const isGlobalLoading = ref(false);
const isRefetching = ref(false);

type fetchQueryOptionsType = {
  notifyOnError?: boolean;
  checkDataExistance?: boolean;
};
type fetchQueryType<T> = (query: T, options?: fetchQueryOptionsType) => void;

export const useApiQuery = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _data = ref<any[] | null>(null);
  const _error = ref<null | string>(null);
  const isLoading = ref(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchQuery: fetchQueryType<PostgrestBuilder<any>> = async (
    query,
    options
  ) => {
    const { notifyOnError, checkDataExistance } = {
      notifyOnError: true,
      checkDataExistance: false,
      ...options,
    };
    try {
      isGlobalLoading.value = true;
      isLoading.value = true;
      if (_data.value !== null) {
        isRefetching.value = true;
      }
      _error.value = null;
      const { data, error } = await query;
      if (error) {
        throw new Error(error.message);
      }
      if (checkDataExistance && (!data || data.length === 0)) {
        throw new Error('no data');
      }
      _data.value = data;
      return _data.value;
    } catch (e) {
      _error.value = (e as Error).message;
      if (notifyOnError) {
        Notify.create({ message: (e as Error).message, type: 'negative' });
      } else {
        throw e;
      }
    } finally {
      isLoading.value = false;
      isGlobalLoading.value = false;
      isRefetching.value = false;
    }
  };

  return {
    data: _data,
    error: _error,
    isLoading,
    isGlobalLoading,
    isRefetching,

    fetchQuery,
  };
};


import { computed, ComputedRef, Ref, ref } from 'vue';

type CacheObject<T> = {
  data: T | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  tags?: string[];
};

type Store<T> = {
  [index: string]: CacheObject<T>;
};

type IncomingFunction<T, R> = (args: T) => Promise<R>;

export const useCachedFunction = <T, R>(
  func: IncomingFunction<T, R>,
  provideTags?: string[]
): {
  execute: (args: T) => ComputedRef<CacheObject<R>>;
  invalidateByTag: (tag: string) => void;
  currentCacheResult: ComputedRef<CacheObject<R>>;
  store: Ref<Store<R>>;
} => {
  const store = ref<Store<R>>({});
  const currentCacheKey = ref<string>('');

  const currentCacheResult = computed(() => store.value[currentCacheKey.value]);

  const execute = (args: T): ComputedRef<CacheObject<R>> => {
    currentCacheKey.value = JSON.stringify(args);
    //
    // Гарантия одиночного запуска
    if (currentCacheResult.value?.isLoading) {
      return currentCacheResult;
    }
    //
    // Если данных нет, то добавляем начальные значение, иначе будет refetch
    if (!store.value[currentCacheKey.value]) {
      store.value[currentCacheKey.value] = {
        data: undefined,
        isLoading: true,
        isRefetching: false,
        tags: provideTags,
      };
    } else {
      store.value[currentCacheKey.value].isRefetching = true;
    }
    //
    // Выполняем функцию и обновляем кэш
    func(args)
      .then((data) => {
        if (data) {
          store.value[currentCacheKey.value] = {
            data,
            isLoading: false,
            isRefetching: false,
            tags: provideTags,
          };
        }
      })
      .finally(() => {
        store.value[currentCacheKey.value].isRefetching = false;
        store.value[currentCacheKey.value].isLoading = false;
      });
    //
    // возвращаем кэшированный объект
    return currentCacheResult;
  };

  const invalidateByTag = (tag: string) => {
    Object.entries(store.value).forEach(([cacheKey, cachedStore]) => {
      if (cachedStore?.tags && cachedStore.tags.includes(tag)) {
        execute(JSON.parse(cacheKey));
      }
    });
  };
  return { execute, invalidateByTag, currentCacheResult, store };
};


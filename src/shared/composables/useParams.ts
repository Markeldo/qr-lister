import { Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const defaultProps = ['eventId', 'teamId', 'id'] as const;

type DefaultProps = (typeof defaultProps)[number];

type useRouteParamsReturnValue<T extends string = DefaultProps> = {
  [index in T]: string;
};

export const useParams = <T extends DefaultProps>(
  ...awaitingParams: T[]
): { params: Ref<useRouteParamsReturnValue<T> | undefined> } => {
  const route = useRoute();

  const paramsKeys = awaitingParams ? awaitingParams : [...defaultProps];

  const params = ref<useRouteParamsReturnValue<T>>();

  watch(
    route,
    () => {
      params.value = Object.keys(route.params)
        .filter((key) => paramsKeys.includes(key as T))
        .reduce(
          (result, key) => ({
            ...result,
            [key]: route.params[key].toString(),
          }),
          {} as useRouteParamsReturnValue<T>
        );
    },
    { deep: true, immediate: true }
  );

  return {
    params,
  };
};

import { useRoute } from 'vue-router';

const defaultProps = ['id'] as const;

type defaultPropsType = (typeof defaultProps)[number];

type useRouteParamsReturnValue<T extends string = defaultPropsType> = {
  [index in T]: string;
};

export const useRouteParams = <T extends defaultPropsType>(
  ...awaitingParams: T[]
): useRouteParamsReturnValue<T> => {
  const route = useRoute();
  const paramsToReturn =
    awaitingParams.length > 0 ? awaitingParams : [...defaultProps];
  console.log(paramsToReturn);

  return paramsToReturn.reduce(
    (result, item) => ({ ...result, [item]: route.params[item] }),
    {} as useRouteParamsReturnValue<T>
  );
};

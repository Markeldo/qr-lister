import { RouteLocationNormalized } from 'vue-router';
import { useUserScopeStore } from 'src/entities/userScope/model/userScope';

export const checkScopes = (to: RouteLocationNormalized) => {
  const store = useUserScopeStore();
  const { scopes: checkingScopes } = to.meta;
  const teamId = (to.params.teamId as string) || undefined;
  if (!checkingScopes || checkingScopes?.length < 1) {
    return true;
  }
  return checkingScopes?.some((scopeName) => store.check(scopeName, teamId));
};


import { RouteLocationNormalized } from 'vue-router';
import { useUserScopeStore } from 'src/entities/userScope/model/userScope';

export const checkScopes = (to: RouteLocationNormalized) => {
  const store = useUserScopeStore();
  const { scopes: checkingScopes, scopeMode = 'some' } = to.meta;
  const teamId = (to.params.teamId as string) || undefined;
  if (!checkingScopes || checkingScopes?.length < 1) {
    return true;
  }
  if (scopeMode === 'some') {
    return checkingScopes?.some((scopeName) => store.check(scopeName, teamId));
  } else {
    return (
      checkingScopes?.filter((scopeName) => store.check(scopeName, teamId))
        .length === checkingScopes.length
    );
  }
};

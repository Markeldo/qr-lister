import { computed, ref } from 'vue';
import { extend } from 'quasar';
import { defineStore } from 'pinia';
import { IUser } from 'src/shared/types';
import {
  allScopesFunctions,
  CombinedPayload,
  Scopes,
  ScopesArrayType,
  UserScopesInterface,
} from '.';

export const useUserScopeStore = defineStore('userScope', () => {
  // state
  const scopesStore = ref<UserScopesInterface>({});

  // getters
  const scopes = computed(() => scopesStore.value);

  // actions
  const setScopes = (update: UserScopesInterface) => {
    scopesStore.value = extend(
      true,
      { ...scopesStore.value },
      update
    ) as UserScopesInterface;
  };

  const updateUserScopes = async (
    scopes: Scopes[] | undefined,
    data: { user: IUser; payload?: CombinedPayload | undefined }
  ) => {
    if (!scopes) {
      return;
    }
    await scopes.reduce(async (_acc, scope) => {
      const selectedScopeFunction = allScopesFunctions[scope];
      if (!selectedScopeFunction) {
        return;
      }
      const newScope = await selectedScopeFunction(data.user, data.payload);
      if (!newScope) {
        return;
      }
      scopesStore.value = extend(
        true,
        { ...scopesStore.value },
        newScope
      ) as UserScopesInterface;
      setScopes(newScope);
    }, {});
  };

  const check = (scope: Scopes, id?: string) => {
    const currentScope = scopes.value[scope];
    if (typeof currentScope === 'undefined') {
      return false;
    }
    switch (currentScope.constructor) {
      case Object:
        if (!id) {
          return false;
        }
        return (currentScope as ScopesArrayType)[id] === true;
      default:
        // Not a plain Object - treat it as a scalar.
        return currentScope === true;
    }
  };

  return { scopes, setScopes, updateUserScopes, check };
});


import { RouteLocationNormalized } from 'vue-router';
import { supabase } from 'src/app/boot/supabase';
import store from 'src/app/store';
import { useUserStore } from 'src/entities/user/model/store';
import { useUserScopeStore } from 'src/entities/userScope/model/userScope';

export const updateUserScopes = async (to: RouteLocationNormalized) => {
  const session = await supabase.auth.getSession();
  const pinia = await store({});
  const scopesStore = useUserScopeStore(pinia);
  const userStore = useUserStore(pinia);
  if (!!session.data.session) {
    await userStore.userGetData({ onlyIfNoData: true });
  }
  const { scopes } = to.meta;
  if (!scopes) {
    return;
  }
  await scopesStore.updateUserScopes(scopes, {
    user: userStore.user,
    payload: { to },
  });
};


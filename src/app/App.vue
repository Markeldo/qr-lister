<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/entities/user';
import { useUserScopeStore } from 'src/entities/userScope';
import { Session } from '@supabase/supabase-js';
import { supabase } from './boot/supabase';

const authStateChanged = ref<Session | null>(null);

const scopesStore = useUserScopeStore();

const store = useUserStore();

const { userGetData } = store;
const { isLoading } = storeToRefs(store);

onMounted(() => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    authStateChanged.value = session;
  });
});

// Такой финт ушами нужен по тому, что нельзя делать запросы внутри функции onAuthStateChange,
// иначе будет подвисать постоянно
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
watch(authStateChanged, async (session: Session) => {
  if (session?.user) {
    if (isLoading.value === false) {
      isLoading.value = true;
      await userGetData();
    }
  } else {
    scopesStore.setScopes({ IS_LOGGED_IN: false, IS_NOT_LOGGED_IN: true });
  }
});
</script>

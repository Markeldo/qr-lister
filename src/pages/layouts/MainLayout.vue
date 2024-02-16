<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="print-hide">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> QRize </q-toolbar-title>

        <div>{{ userStore.user.nickname }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="print-hide"
    >
      <q-list>
        <q-item-label header> Ваш список розыгрышей </q-item-label>
        <q-item
          clickable
          v-ripple
          v-for="giveaway in giveaways"
          :key="giveaway.id"
          exact
          :to="{ name: 'prizeGiveaway', params: { id: giveaway.id } }"
          class="item"
        >
          {{ giveaway.name }}
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useUsersPrizeGiveawayStore } from 'src/entities/prizeGiveaway';
import { useUserStore } from 'src/entities/user';

const userStore = useUserStore();
const useGiveawayStore = useUsersPrizeGiveawayStore();

const giveaways = computed(() => {
  return useGiveawayStore.store?.data || [];
});

const leftDrawerOpen = ref(false);

onMounted(() => {
  if (giveaways.value.length < 1) {
    useGiveawayStore.read({ user_id: userStore.user.id });
  }
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped lang="scss">
.item {
  min-height: 0;
}
</style>

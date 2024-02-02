<template>
  <q-page class="column items-center justify-center">
    <AddGiveawayBtn />
    <q-list bordered separator class="q-mt-md">
      <q-item
        clickable
        v-ripple
        v-for="giveaway in giveaways"
        :key="giveaway.id"
        :to="{ name: 'prizeGiveaway', params: { id: giveaway.id } }"
      >
        <q-item-section>{{ giveaway.name }}</q-item-section>
        <q-item-section side>
          <DeleteGiveawayBtn :giveawayId="giveaway.id" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
  <AddGiveawayDialog />
  <DeleteGiveawayDialog />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import {
  AddGiveawayBtn,
  AddGiveawayDialog,
} from 'src/features/AddPrizeGiveaway';
import {
  DeleteGiveawayBtn,
  DeleteGiveawayDialog,
} from 'src/features/DeletePrizeGiveaway';
import { useUsersPrizeGiveawayStore } from 'src/entities/prizeGiveaway';
import { useUserStore } from 'src/entities/user';
console.log('nk@mt-tools.ru'.toUpperCase());
const userStore = useUserStore();
const useGiveawayStore = useUsersPrizeGiveawayStore();

const giveaways = computed(() => {
  return useGiveawayStore.store?.data || [];
});

onMounted(() => {
  useGiveawayStore.read({ user_id: userStore.user.id });
});
</script>

<style scoped lang="scss">
.myClass {
  color: $primary;
}
</style>

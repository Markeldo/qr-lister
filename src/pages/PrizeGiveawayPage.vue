<template>
  <div class="row justify-between items-center q-mb-lg">
    {{ giveaway?.name }}
    <q-btn :to="{ name: 'printCoupons', params: { id: id } }">
      Распечатать купоны
    </q-btn>
    <q-space />
    <AddCouponsForm :giveawayId="id" />
  </div>
  <CouponsWidget :giveawayId="id" />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { CouponsWidget } from 'src/widgets/CouponsWidget';
import { AddCouponsForm } from 'src/features/AddCoupons';
import { usePrizeGiveawayStore } from 'src/entities/prizeGiveaway';
import { useRouteParams } from 'src/shared/composables';

const { id } = useRouteParams('id');
const prizeGiveawayStore = usePrizeGiveawayStore();

const giveaway = computed(() => prizeGiveawayStore.store?.data);

watch(
  () => id,
  () => {
    prizeGiveawayStore.read(id);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.row {
  gap: 16px;
  padding: 20px;
}
</style>

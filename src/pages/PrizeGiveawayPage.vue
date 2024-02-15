<template>
  <div class="row justify-between items-center q-mb-lg relative-position">
    {{ giveaway?.name }}
    <ChangeStatus />
    <q-space />
    <AddCouponsForm v-if="giveaway?.status === 'active'" :giveawayId="id" />
    <q-btn
      v-if="giveaway?.status === 'active'"
      :to="{ name: 'printCoupons', params: { id: id } }"
      icon="print"
      title="Распечатать купоны"
    />
    <q-btn
      v-if="giveaway?.status === 'registration_closed'"
      :to="{
        name: 'conducting',
        params: { id: id },
      }"
      color="primary"
    >
      Разыграть
    </q-btn>
    <q-inner-loading :showing="isRefetching" />
  </div>
  <CouponsWidget :giveawayId="id" />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { CouponsWidget } from 'src/widgets/CouponsWidget';
import { AddCouponsForm } from 'src/features/AddCoupons';
import { ChangeStatus } from 'src/features/ChangeGiveawayStatus';
import { usePrizeGiveawayStore } from 'src/entities/prizeGiveaway';
import { useRouteParams } from 'src/shared/composables';

const { id } = useRouteParams('id');
const prizeGiveawayStore = usePrizeGiveawayStore();

const giveaway = computed(() => prizeGiveawayStore.store?.data);
const isRefetching = computed(() => prizeGiveawayStore.store.isRefetching);

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
